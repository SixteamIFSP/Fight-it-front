import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { useUser } from "../../hooks/user"
import { ClassText, ContainerFlat, ContainerList, ContentListagem } from "./styles";
import { CardAula } from "../cardAula";
import { convertDataUTC, convertDateToBrString, dateSplit } from "../../utils/dateConvert";
import { getCalendarList } from "../../controler/calendar";
import { ContainerHeader, TextHeader, TextHeaderDate } from "../calendarView/styles";
import { AddButton } from "../addButton";
import { useTranslation } from 'react-i18next';

export function ListCalendarDates({selectedDate, addHandle, handleChangeScreen}){
    const { user } = useUser();
    const [dates, setDates] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const date = dateSplit(selectedDate);
        getCalendarList(user.userID, date, user.tipoUsuario===1, setDates);
    }, [selectedDate]);

    return (
    <ContainerList>
        <ClassText>{t('ListCalendarDate.classes')}</ClassText>
       
        <ContainerHeader>
            <TextHeaderDate>
                {t('ListCalendarDate.scheduledclasses')} {convertDateToBrString(new Date (selectedDate))}
            </TextHeaderDate>

            {
                (user.tipoUsuario === 1) ?
            
                <AddButton handle={addHandle} />
                :<></>
            }  
            
        </ContainerHeader>
        <ContainerFlat>
            { dates.length > 0 ? 
                <ContentListagem
                data={dates}
                renderItem={
                    ({ item }) => <CardAula item={item} handleChangeScreen={handleChangeScreen}/>
                }
                >
                </ContentListagem>
                :
                <Text>{t('ListCalendarDate.thereAreNo')}</Text>
            }
        </ContainerFlat>
    </ContainerList>
    )
}