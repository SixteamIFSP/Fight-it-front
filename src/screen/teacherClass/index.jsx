import React, { useEffect, useState } from "react";
import {
    CardTitle,
    CardView,
    Container,
    ContainerForm,
    ContainerList,
    ContainerTitle,
    TextTitle,
    CardCreateClasss,
} from "./styles";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { createClass, getAulasByProfessor, getClass } from "../../controler/class";
import { useUser } from "../../hooks/user";
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation";
import { Input } from "../../components/input";
import { toastMessage } from "../../utils/toastMessage";
import { AddButton } from "../../components/addButton";
import { Loading } from "../../components/loading";
import { useTranslation } from 'react-i18next';
import { useIsFocused } from "@react-navigation/native";

function CardTurma({ data, handleNewScreen }) {
    const { t } = useTranslation()
    const { user } = useUser();

    const condicionalNavigate = user.tipoUsuario == 1 ? {
        tela: "ClassView",
        title: t("navigationHeader.ClassDescription", {name:data?.TurmaNome}),
        data: {...data, nomeTurma:data?.TurmaNome}
    } :
    {
        tela: "StudantView",
        title: "Avaliação",
        data: {...data, nomeTurma:data?.TurmaNome}
    }

    // TODO: COLOCAR AS INFORMAÇÕES DENTRO DE CADA CARD E VALIDAR SE EXISTE OU NÃO INFORMAÇÕES.
    return (
        <CardView onPress={()=>handleNewScreen(condicionalNavigate.tela, {title: condicionalNavigate.title, data:condicionalNavigate.data})}>
            <CardTitle>{data?.TurmaNome}</CardTitle>
        </CardView>
    )
};

function LoadingClass({ user, setCreateNew, navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();

    console.log("teste usuario", user);

    useEffect(()=>{
        function effect (){
            handleLoadMore();
        };
        isFocused && effect();
    }, [isFocused])

    async function handleLoadMore() {
        if (loading) return;    
        setLoading(true);
        await getClass(setData, user.userID, user.tipoUsuario === 1);
        setLoading(false);
    };

    function handleNewScreen(screen, params) {
        navigation.navigate(screen, params)
    };

    return (
        <>
            {
                (user.tipoUsuario === 1) &&
                <AddButton handle={() => setCreateNew((value) => !value)} />
            }
            <ContainerList>
                {data?.length >= 1 ? 
                    <FlatList
                        style={{width:'100%'}}
                        data={data}
                        renderItem={({ item }) => <CardTurma data={item} handleNewScreen={handleNewScreen}></CardTurma>}
                        // onEndReached={handleLoadMore}
                        onEndThreshold={0.01}
                        keyExtractor={item => item.id}
                        ListFooterComponent={
                            <Loading loading={loading} size={30}></Loading>
                        }
                    />
                    :<Text >Este professor não possui turmas</Text>
                }
            </ContainerList>
        </>
    )
};

function CreateClass({ user, setCreateNew }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const { t } = useTranslation();

    function confirm() {
        if (name !== '', description != '') {
            const data = {
                nome: name,
                descricao: description,
                professorId: user.userID,
            };
            createClass(data);
            cancel();
        } else {
            toastMessage(false, t("toast.error.blank"));
        };
        
    };
    function cancel() {
        setCreateNew(false);
    };

    return (
        <CardCreateClasss>
            <ContainerTitle>
                <TextTitle>{t('createClass.Header')}</TextTitle>
            </ContainerTitle>
            <ContainerForm>
                <Input
                    value={name}
                    placeholder={t('createClass.Placeholder.Nome')}
                    onChangeText={setName}
                />
                <Input
                    value={description}
                    placeholder={t('createClass.Placeholder.Description')}
                    onChangeText={setDescription}
                />
            </ContainerForm>
            <DoubleButtonConfirmation handleConfirm={confirm} handleBack={cancel}></DoubleButtonConfirmation>
        </CardCreateClasss>
    )
};

export function TeacherClass({ navigation }) {
    const { user } = useUser();
    const [createNew, setCreateNew] = useState(false);

    return (
        <Container>
            {!createNew ?
                (
                    <LoadingClass user={user} setCreateNew={setCreateNew} navigation={navigation}></LoadingClass>

                ) :
                (
                    <CreateClass user={user} setCreateNew={setCreateNew}></CreateClass>
                )
            }
        </Container>
    );
};