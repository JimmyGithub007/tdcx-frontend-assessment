import { Avatar, Navbar } from "../../styles";

const Header = ({ user, navigate }) => {
    const logout = () => {
        localStorage.removeItem("userData");
        navigate('/login');
    }

    return (<Navbar>
        <div className="content">
            <div className="profile">
                <Avatar>
                    <img src={user?.image} alt="profile" />
                </Avatar>
                <span>{user?.token?.name}</span>
            </div>
            <span className="link" onClick={logout}>Logout</span>
        </div>
    </Navbar>)
}

export default Header;