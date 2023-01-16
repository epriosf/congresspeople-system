import {Button} from "primereact/button";
import {Menubar} from "primereact/menubar";

const Header = () => {
    const start = <Button label="Users" icon="pi pi-user" className="p-button-secondary p-button-text autofocus"/>;
    const end = <Button label="Logout" icon="pi pi-power-off" className="p-button-secondary p-button-text autofocus"/>;
    return (
        <Menubar start={start} end={end}/>
    );

}
export default Header;