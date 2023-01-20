import {Button} from "primereact/button";

const Footer = () => {
    return (
        <>
            <div className="flex justify-content-center flex-wrap card-container">
                <Button icon="pi pi-facebook"
                        className="p-button-rounded p-button-primary flex align-items-center justify-content-center m-3"
                        aria-label="Bookmark"/>
                <Button icon="pi pi-github"
                        className="p-button-rounded p-button-primary flex align-items-center justify-content-center m-3"
                        aria-label="Bookmark"/>
                <Button icon="pi pi-linkedin"
                        className="p-button-rounded p-button-primary flex align-items-center justify-content-center m-3"
                        aria-label="Bookmark"/>
            </div>
            <div className="flex justify-content-center">
                @2023 Erick Rios All rights reserved
            </div>
        </>
    )
        ;

}
export default Footer;