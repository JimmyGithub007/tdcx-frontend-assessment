import axios from "axios";
import { Button, Card, Input } from "../../styles";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
          id: "8ffe38cd42c8c20b",
          name: "John Doe"
        }
    });

    const onSubmit = data => {
        console.log(data);
        axios.post(`https://dev-dl.tdcx.com:3092/login`, {
          "name": data.name,
          "apiKey": data.id
        }).then(resp => {
          console.log(resp.data);
          localStorage.setItem('userData', JSON.stringify({
            image: `https://dev-dl.tdcx.com:3092/${resp.data.image}`,
            token: resp.data.token
          }))
          navigate('/');
        }).catch(error => {
            console.log(error.response.data.msg)
        })
    }

    useEffect(() => {
        if(localStorage.getItem("userData")) {
            navigate('/')
        }
    }, [navigate])

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            height: "100vh"
        }}>
            <Card style={{
                padding: "24px 24px 33px 24px"
            }}>
                <span style={{
                    color: "#537178",
                    fontSize: "20px",
                    fontWeight: 600,
                    paddingBottom: "12px",
                }}>Login</span>
                <Controller
                    control={control}
                    name="id"
                    render={({ field }) => <Input {...field} placeholder="Id" type="text" /> }
                    rules={{ required: true }}
                />
                { errors.id && <span>Id is required</span> }
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => <Input {...field} placeholder="Name" type="text" /> }
                    rules={{ required: true }}
                />
                { errors.name && <span>Name is required</span> }
                <Button className="full" type="submit">Login</Button>
            </Card>
        </div>
    </form>)
}

export default Login;