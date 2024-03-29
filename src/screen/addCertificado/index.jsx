import React, { useState } from "react"
import { View, Text, Pressable } from "react-native"
import { useTranslation } from 'react-i18next'
import { CheckBox } from '../../components/checkbox'
import { Input } from '../../components/input'
import { styles as stylesGlobal } from '../../global/styles'
import { ButtonLinguage } from "../../components/buttonChangeLinguage"
import { DoubleButtonConfirmation } from "../../components/doubleButtonConfirmation"

export function addCertificado({ navigation, route }) {
    const { t } = useTranslation()
    const [valor, setValor] = useState('');
    const [check, setCheck] = useState(false);

    // const { dataAuth } = route.params;

    function validation() {
        if (valor === '')
            return false

        return true
    };

    function handleConfirm() {
        if (validation()) {
            const data = {
                aluno: {
                    valor: valor,
                    check: check
                }
            }
     
            navigation.navigate('Login');
        } else {
        
        }
    };
    function handleBack() {
        navigation.navigate('CreateAccount');

    };

    return (
        <View style={stylesGlobal.container}>
            <Text>{t(`createAccount.triage.title`)}</Text>
            <Text style={{ width: "60%", marginBottom: 60 }}>{t(`createAccount.triage.description`)}</Text>
            <Pressable onPress={() => setCheck((value) => !value)} style={{ flexDirection: "row", width: '100%', alignItems: "center" }}>
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ textAlign: "left" }}>{t(`createAccount.triage.form-Heart`)}</Text>
                </View>
                <View style={{ marginLeft: 20 }}>

                    <CheckBox style={{ backgroundColor: 'black' }} isChecked={check} onPress={() => setCheck((value) => !value)}></CheckBox>
                </View>
            </Pressable>
            <View style={{ flexDirection: "row", width: '100%', justifyContent: "center", alignItems: "center" }}>

                <Input placeholder={t(`createAccount.triage.form-other-problems`)} value={valor} onChangeText={setValor}></Input>
            </View>

            <DoubleButtonConfirmation handleConfirm={handleConfirm} handleBack={handleBack}></DoubleButtonConfirmation>
        </View>
    );
};