import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Button, Card, CheckList, Input, List, NoTask, SearchInput, Skeleton, TaskBottom, TaskTop, Title, WithTask } from "../../styles";
import { Controller, useForm } from 'react-hook-form';

import Header from "../layouts/header";
import Modal from '../widgets/modal';
import axios from 'axios';
import PieChart from '../widgets/pie';

const apiURL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(true);
    const [ search, setSearch ] = useState("");
    const [ show, setShow ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ task, setTask ] = useState({
        tasksCompleted: 0,
        totalTasks: 0, 
        latestTasks: [],
        listing: []
    });

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            id: 0,
            name: "",
            completed: false
        }
    });

    const remove = id => {
        const axiosInstance = axios.create({
            headers: { Authorization: `Bearer ${user.token.token}` }
        });

        axiosInstance.delete(`${apiURL}/tasks/${id}`).then(() => {
            setTask({
                ...task,
                listing: task.listing.filter(t => t._id !== id)
            });
        }).catch(error => {
            console.log(error);
        })
    }

    const store = async value => {
        console.log(value)
        const axiosInstance = axios.create({
            headers: { Authorization: `Bearer ${user.token.token}` }
        });

        let resp = null;
        try {
            if(value.id !== 0) {//update
                let data = { name: value.name, completed: value.completed };
                resp = await axiosInstance.put(`${apiURL}/tasks/${value.id}`, data);

                setTask({
                    ...task,
                    listing: task.listing.map(t => t._id === value.id ? resp.data.task : t )
                });
            } else {//create
                resp = await axiosInstance.post(`${apiURL}/tasks`, {
                    name: value.name
                });

                setTask({
                    ...task,
                    totalTasks: task.totalTasks+1,
                    listing: [
                        resp.data.task, ...task.listing
                    ]
                });
            }

            setShow(false);
        } catch(error) {
            console.log(error);
        }
    }

    const openModal = (value) => {
        setShow(true);
        reset({
            id: value ? value._id : 0,
            name: value ? value.name : "",
            completed: value ? value.completed : false
        });    
    }

    useEffect(() => {
        if(localStorage.getItem("userData")) {
            setUser(JSON.parse(localStorage.getItem("userData")))
        } else {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000) 
    }, [search])

    useEffect(() => {
        if(user) {
            const axiosInstance = axios.create({
                headers: { Authorization: `Bearer ${user.token.token}` }
            });

            axios.all([
                axiosInstance.get(`${apiURL}/dashboard`),
                axiosInstance.get(`${apiURL}/tasks`),
            ]).then(resp => {
                setTask({
                    ...resp[0].data,
                    listing: resp[1].data.tasks
                });
            }).catch(error => {
                console.log(error)
            })
        }
    }, [user])

    return (<>
        <Header navigate={navigate} user={user} />
        {   task.totalTasks === 0 ?
            <NoTask>
                <Card
                    style={{
                        padding: "37px 64px"
                    }}
                >
                    <span>You have no task.</span>
                    <Button onClick={() => openModal(null) }>+ New Task</Button>
                </Card>
            </NoTask> :
            <WithTask>
                <TaskTop>
                    <Card>
                        <Title>Tasks Completed</Title>
                        <span>
                            <span 
                                style={{ fontSize: "64px", color: "#5285EC" }}>
                            {task.tasksCompleted}</span>
                            <span style={{ color: "#8F9EA2", fontSize: "20px" }}> / {task.totalTasks}</span>
                        </span>
                    </Card>
                    <Card>
                        <Title>Latest Created Tasks</Title>
                        <List>
                            {
                                loading ? <div>
                                  <Skeleton height="14px" width="100%" />
                                  <Skeleton height="14px" width="90%" />
                                  <Skeleton height="14px" width="80%" />                                    
                                </div> :
                                task.latestTasks.map((value, key) => (
                                    <li key={key}>{value.name}</li>
                                ))
                            }
                        </List>
                    </Card>
                    <Card>
                        <PieChart incompleted={task.totalTasks - task.tasksCompleted} completed={task.tasksCompleted} />
                    </Card>
                </TaskTop>     
                <TaskBottom>
                    <div className="title">
                        <Title>Tasks</Title>
                        <div className="action">
                            <SearchInput>
                                <Input placeholder="Search by task name" onChange={e => setSearch(e.target.value) } />
                                <img src="./icons/search-solid.svg" />
                            </SearchInput>
                            <Button onClick={() => openModal(null) }>+ New Task</Button>
                        </div>
                    </div>
                    <Card>
                            {   loading ? <div style={{ padding: "24px" }}>
                                    <Skeleton height="24px" width="100%" />
                                    <Skeleton height="24px" width="90%" />
                                    <Skeleton height="24px" width="80%" />
                                </div> :
                                task.listing.filter(t => t.name.toLowerCase().includes(String(search).toLowerCase())).map((value, key) => (
                                    <CheckList key={key} style={{ 
                                        borderBottom: key === task.listing.length - 1 ? "unset" : "2px solid #E8E8E8"
                                    }}>
                                        <div>
                                            <input type='checkbox' checked={value.completed} onChange={() => store({ id: value._id, name: value.name, completed: !value.completed }) } />
                                            <Title className={`${value.completed && "strike"}`}>{value.name}</Title>
                                        </div>
                                        <div className="action">
                                            <img onClick={() => openModal(value) } src="./icons/pen-solid.svg" style={{ marginRight: "16px" }} />
                                            <img onClick={() => remove(value._id) } src="./icons/trash-solid.svg" />
                                        </div>
                                    </CheckList>
                                ))
                            }
                    </Card>
                </TaskBottom>           
            </WithTask>

        }
        <Modal show={show} onClose={() => setShow(false)}>
            <Title>+ New Task</Title>
            <form id="taskForm" onSubmit={handleSubmit(store)}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => <Input {...field} placeholder="Task Name" type="text" /> }
                    rules={{ required: true }}
                />                             
            </form>
            <Button className="full" type="submit" form="taskForm">+ New Task</Button>
        </Modal>
    </>)
}

export default Dashboard;