import { Avatar, Navbar } from "../../styles";

const Header = ({ user, navigate }) => {
    const logout = () => {
        localStorage.removeItem("userData");
        navigate('/login');
    }

    return (<Navbar>
        <div className="content">
            <div style={{ 
                display: "flex",
                alignItems: "center",
                gap: "16px",
            }}>
                <Avatar src={user?.image} alt="profile" />
                <span>{user?.token?.name}</span>
            </div>
            <span className="link" onClick={logout}>Logout</span>
        </div>
    </Navbar>)
}

export default Header;