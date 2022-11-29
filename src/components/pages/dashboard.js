import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Button, Card, CheckList, Input, List, NoTask, SearchInput, Skeleton, TaskBottom, TaskTop, Title, WithTask } from "../../styles";
import { Controller, useForm } from 'react-hook-form';
import _ from 'lodash';

import Header from "../layouts/header";
import Modal from '../widgets/modal';
import axios from 'axios';
import PieChart from '../widgets/pie';

const apiURL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
    const navigate = useNavigate();
    const [ taskLoading, setTaskLoading ] = useState(true);
    const [ latestLoading, setLatestLoading ] = useState(true);
    const [ search, setSearch ] = useState("");
    const [ show, setShow ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ task, setTask ] = useState({
        tasksCompleted: 0,
        totalTasks: 0, 
        latestTasks: [],
        listing: []
    });

    const { control, handleSubmit, reset, getValues } = useForm({
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

        const taskListing = task.listing.filter(t => t._id !== id);
        axiosInstance.delete(`${apiURL}/tasks/${id}`).then(() => {
            setTask({
                totalTasks: task.totalTasks - 1,
                tasksCompleted: task.tasksCompleted -1,
                latestTasks: _.orderBy(taskListing, ["createdAt"], ["desc"]).filter((t, k) => t._id !== id && k < 3),
                listing: taskListing
            });
        }).catch(error => {
            console.log(error);
        })
    }

    const store = async value => {
        const axiosInstance = axios.create({
            headers: { Authorization: `Bearer ${user.token.token}` }
        });

        let resp = null;
        try {
            if(value.id !== 0) {//update
                let data = { name: value.name, completed: value.completed };
                resp = await axiosInstance.put(`${apiURL}/tasks/${value.id}`, data);

                let tasksCompleted = task.tasksCompleted;
                if(task.listing.find(t => t._id === value.id).completed !== value.completed) {
                    if(value.completed) tasksCompleted += 1;
                    else tasksCompleted -= 1;
                }

                setTask({
                    ...task,
                    tasksCompleted: tasksCompleted,
                    latestTasks: task.latestTasks.map(t => t._id === value.id ? resp.data.task : t ),
                    listing: task.listing.map(t => t._id === value.id ? resp.data.task : t )
                });
            } else {//create
                resp = await axiosInstance.post(`${apiURL}/tasks`, {
                    name: value.name
                });

                const taskListing = [ resp.data.task, ...task.listing ];
                setTask({
                    ...task,
                    totalTasks: task.totalTasks+1,
                    latestTasks: _.orderBy(taskListing, ["createdAt"], ["desc"]).filter((t, k) => k < 3),
                    listing: taskListing
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
    }, [navigate])

    useEffect(() => {
        setTaskLoading(true);
        setTimeout(() => {
            setTaskLoading(false);
        }, 1000) 
    }, [search])

    useEffect(() => {
        if(user) {
            setLatestLoading(true);
            const axiosInstance = axios.create({
                headers: { Authorization: `Bearer ${user.token.token}` }
            });
    
            axios.all([
                axiosInstance.get(`${apiURL}/dashboard`),
                axiosInstance.get(`${apiURL}/tasks`),
            ]).then(resp => {
                setTimeout(() => {
                    setLatestLoading(false);
                }, 1000);  
    
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
                                latestLoading ? <div>
                                  <Skeleton height="14px" width="100%" />
                                  <Skeleton height="14px" width="90%" />
                                  <Skeleton height="14px" width="80%" />                                    
                                </div> :
                                task.latestTasks.map((value, key) => (
                                    <li className={`${value.completed && "strike"}`} key={key}>{value.name}</li>
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
                                <img src="./icons/search-solid.svg" alt="search" />
                            </SearchInput>
                            <Button onClick={() => openModal(null) }>+ New Task</Button>
                        </div>
                    </div>
                    <Card>
                            {   taskLoading ? <div style={{ padding: "24px" }}>
                                    <Skeleton height="24px" width="100%" />
                                    <Skeleton height="24px" width="90%" />
                                    <Skeleton height="24px" width="80%" />
                                </div> :
                                _.orderBy(task.listing, ["createdAt"], ["desc"]).filter(t => t.name.toLowerCase().includes(String(search).toLowerCase())).map((value, key) => (
                                    <CheckList key={key} style={{ 
                                        borderBottom: key === task.listing.length - 1 ? "unset" : "2px solid #E8E8E8"
                                    }}>
                                        <div>
                                            <input type='checkbox' checked={value.completed} onChange={() => store({ id: value._id, name: value.name, completed: !value.completed }) } />
                                            <Title className={`${value.completed && "strike"}`}>{value.name}</Title>
                                        </div>
                                        <div className="action">
                                            <img onClick={() => openModal(value) } src="./icons/pen-solid.svg" style={{ marginRight: "16px" }} alt="pen" />
                                            <img onClick={() => remove(value._id) } src="./icons/trash-solid.svg" alt="trash" />
                                        </div>
                                    </CheckList>
                                ))
                            }
                    </Card>
                </TaskBottom>           
            </WithTask>

        }
        <Modal show={show} onClose={() => setShow(false)}>
            <Title>{getValues("id") === 0 ? "+ New" : <><img src="./icons/pen-solid.svg" alt="pen" /> Edit</> } Task</Title>
            <form id="taskForm" onSubmit={handleSubmit(store)}>
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => <Input {...field} placeholder="Task Name" type="text" /> }
                    rules={{ required: true }}
                />                             
            </form>
            <Button className="full" type="submit" form="taskForm">{getValues("id") === 0 ? "+ New" : "Update" } Task</Button>
        </Modal>
    </>)
}

export default Dashboard;