import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {Badge} from "primereact/badge";
/* eslint react/prop-types: 0 */
const CongressPerson = (props) => {
    const header = (
        <div className="flex justify-content-end flex-wrap card-container">
            <div className="flex align-items-center justify-content-center m-2">
                <div className="flex justify-content-between flex-wrap card-container bg-yellow-500 border-round">
                    <div
                        className="flex align-items-center justify-content-center font-bold text-black-alpha-90 m-2">votes
                    </div>
                    <div
                        className="flex align-items-center justify-content-center m-2">
                        <Badge value={props.congressPerson.totalVotes} severity="danger"></Badge>
                    </div>
                </div>
            </div>
        </div>
    );
    const footer = (
        <div className="flex justify-content-between flex-wrap card-container">
            <div
                className="flex align-items-center justify-content-center">
                <Button icon="pi pi-youtube" className="p-button-rounded p-button-danger" aria-label="Cancel"
                        tooltip={props.congressPerson.youtubeAccount} tooltipOptions={{position: 'bottom'}}/>
            </div>
            <div
                className="flex align-items-center justify-content-center">
                <Button icon="pi pi-twitter" className="p-button-rounded p-button-success" aria-label="Search"
                        tooltip={props.congressPerson.twitterAccount} tooltipOptions={{position: 'bottom'}}/>
            </div>
            <div
                className="flex align-items-center justify-content-center">
                <Button icon="pi pi-facebook" className="p-button-rounded p-button-info" aria-label="User"
                        tooltip={props.congressPerson.facebookAccount} tooltipOptions={{position: 'bottom'}}/>
            </div>
            <div
                className="flex align-items-center justify-content-center">
                <Button icon="pi pi-discord" className="p-button-rounded p-button-warning" aria-label="Notification"
                        tooltip={props.congressPerson.apiUrl} tooltipOptions={{position: 'bottom'}}/>
            </div>
        </div>
    );

    return (
        <Card title={`${props.congressPerson.firstName} ${props.congressPerson.lastName}`}
              subTitle={props.congressPerson.title} footer={footer} header={header}>
            <p>{props.congressPerson.birthday}</p>
            <p>{props.congressPerson.party}</p>
        </Card>
    )

}
export default CongressPerson;
