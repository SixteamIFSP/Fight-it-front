import { api } from "../services/api";
import { toastMessage } from "../utils/toastMessage";

export async function createAccount(data, type) {
    try {
        let response;
        if (type) {
            response = await api.post('/user/cadastro/professor', { ...data });
        } else {
            response = await api.post('/user/cadastro/aluno', data);
        }

        if (response.data.status) {
            return response.data;
        } else {
            return response.data;
        }

    } catch (error) {
        toastMessage(false, 'Erro de conexão!')
    }
}


export async function GetUserAccount(setDataUser, id, type) {
    let response;
    try {
        if (type) {
            response = await api.get(`/user/busca/professor/${id}`,);
        } else {
            response = await api.get(`/user/busca/aluno/${id}`,);
        }

        if (response.data.status) {
            setDataUser(response?.data.result);
            // toastMessage(true, response?.data.mensagem)
        } else {
            toastMessage(false, response?.data.mensagem)
        }

    } catch (error) {

        toastMessage(false, 'Erro de conexão!')
    }
}

export async function ChangeInfoAccount(data, type) {
    try {
        let response;
        if (type) {
            response = await api.patch('/user/perfil/professor', { ...data });
        } else {
            response = await api.patch('/user/perfil/aluno', { ...data });
        }

        if (response.data.status) {
            toastMessage(true, response.data.mensagem)
        } else {
            toastMessage(false, response.data.mensagem)
        }

    } catch (error) {

        toastMessage(false, "Erro de conexão!");
    }
}

export async function ChangePassowrd(data, type) {
    try {
        let response;
        if (type) {
            response = await api.patch('/user/senha/professor', { ...data });
        } else {
            response = await api.patch('/user/senha/aluno', { ...data });
        }
        if (response?.data.status) {
            toastMessage(true, 'Senha atualizada com sucesso!')
        } else {
            toastMessage(false, 'Insira a senha atual')
        }

    } catch (error) {

        toastMessage(false, "ERRO INTERNO");
    }
}

export async function DeleteAccount(data, type, logout) { // data => {id:number, senha:string}

    function desconect() {
        logout();
    }

    try {
        let response;
        if (type) {
            response = await api.delete('/user/excluir/professor', { data: { ...data } });
        } else {
            response = await api.delete('/user/excluir/aluno', { data: { ...data } });
        }
        if (response.data.status) {
            toastMessage(true, 'Conta desativada com sucesso!')
            desconect();
        } else {
            toastMessage(false, 'Erro ao atualizar')
        }

    } catch (error) {

        toastMessage(false, "Erro ao enviar os dados");
    }
}
