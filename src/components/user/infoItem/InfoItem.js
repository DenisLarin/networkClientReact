import React from 'react';
import classes from './infoitem.module.scss'

import birthday from './../../../assets/icons/userProfile/infoItems/birthday.svg'
import email from './../../../assets/icons/userProfile/infoItems/email.svg'
import gender_m from './../../../assets/icons/userProfile/infoItems/gender_m.svg'
import gender_w from './../../../assets/icons/userProfile/infoItems/gender_w.svg'
import phone from './../../../assets/icons/userProfile/infoItems/phone.svg'
import userStatusTrue from './../../../assets/icons/userProfile/infoItems/userStatusTrue.svg'
import userStatusFalse from './../../../assets/icons/userProfile/infoItems/userStatusFalse.svg'
import InfoItemIcon from "./infoItemIcon/InfoItemIcon";
import InfoItemContent from "./infoItemContent/InfoItemContent";

function InfoItem(props) {
    let icon = null;
    let infoItemContent = <InfoItemContent itemName={props.id} value={props.value}/>;
    switch (props.id) {
        case 'email':
            icon = email;
            break;
        case 'gender':
            icon = props.value === 'M' ? gender_m : gender_w;
            break;
        case 'phone':
            icon = phone;
            break;
        case 'status':
            icon = props.value === 'notActivated' ? userStatusFalse : userStatusTrue;
            break;
        case 'birthday':
            icon = birthday;
            const date = new Date(props.value);
            const age = (new Date().getFullYear() - date.getFullYear());

            infoItemContent = <InfoItemContent itemName={age + " years"} value={date.toLocaleDateString()}/>
            break;
    }
    return (
        <div className={classes.infoItem}>
            <InfoItemIcon url={icon}/>
            {infoItemContent}
        </div>
    );
}

export default InfoItem;