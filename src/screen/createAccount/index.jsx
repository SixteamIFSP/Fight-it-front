import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native'
import { ButtonLinguage } from '../../components/buttonChangeLinguage';
import { DoubleButtonConfirmation } from '../../components/doubleButtonConfirmation';
import { Input } from '../../components/input';
import { createAccount } from '../../controler/account';
import { styles as stylesGlobal } from '../../global/styles';
import { styles } from './styles';
import { SwitchButton } from '../../components/switchbutton';
import { Loading } from '../../components/loading';
import { toastMessage } from '../../utils/toastMessage';
import inputValidators from '../../utils/inputValidators';
import MaskInput, { Masks } from 'react-native-mask-input';

export function CreateAccount({ navigation }) {
    //desestruturação dos imports
    const { validationEmail, validationName } = inputValidators()
    const { t } = useTranslation()

    //loading
    const [loading, setLoading] = useState(false);

    //setter dos campos
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [typeTeacher, setTypeTeacher] = useState(true);

    const [invalidEmailMessage, setInvalidEmailMessage] = useState('');
    const [invalidNameMessage, setInvalidNameMessage] = useState('');
    
    const errors = useRef([]);

    const handleEmail = (value) => {
        setMail(value);
        setInvalidEmailMessage(validationEmail(value));

    };
    const handleName = (value) => {
        setName(value);
        setInvalidNameMessage(validationName(value));
    };

    function inputValidations() {
        errors.current = [];
        if (
            name === '' |
            phone === '' |
            mail === '' |
            password === '' |
            passwordConfirm === '' |
            password !== passwordConfirm
        ) {

            (name === '') && errors.current.push('Nome não preenchido');
            (mail === '') && errors.current.push('E-mail não preenchido');
            (phone === '') && errors.current.push('Telefone não preenchido');
            (password === '') && errors.current.push('Senha não preenchida');
            (passwordConfirm === '') && errors.current.push('Confirmação não preenchida');
            (password !== passwordConfirm) && errors.current.push('Senha diferente da confirmação');
        }
    };

    //valida se os campos estão preenchidos corretamente
    function oldValidations() {
        if (
            name === ''
            | phone === ''
            | mail === ''
            | password === ''
            | password !== passwordConfirm
        )
            return false;

        return true;
    };


    async function handleConfirmButton() {
        if (loading) return
        if (inputValidations()) {
            const data = {
                nome: name,
                email: mail,
                telefone: phone,
                senha: password,
                receberNot: 1,
            };
            if (!typeTeacher) {
                navigation.navigate('CreateTriagem', { data });
                return
            }
            setLoading(true);
            await createAccount(data, typeTeacher);
            setLoading(false);
            navigation.navigate('Login');
        } else {
            let errorsText = "Digite os campos corretamente: "
            errors.current.map((value) => {
                errorsText = errorsText + `\n ${value}`
            });

            toastMessage(false, errorsText);
        }
    };

    function handleBack() {
        navigation.navigate('Login');
    };

    return (
        <View style={stylesGlobal.container}>
            <ButtonLinguage></ButtonLinguage>
            <Text style={styles.TitleLogin}>Fight It</Text>

            <View style={styles.userTypeChoice}>
                <Text>{t('createAccount.descriptionSwitch')}</Text>
            </View>

            <View style={styles.switchButtons}>
                <SwitchButton
                    onPress={() => setTypeTeacher(true)}
                    text={t('createAccount.teacher')}
                    type={typeTeacher}
                ></SwitchButton>
                <SwitchButton
                    onPress={() => setTypeTeacher(false)}
                    text={t('createAccount.student')}
                    type={!typeTeacher}
                ></SwitchButton>
            </View>

            <View style={styles.inputesContainer}>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={(value) => { handleName(value) }}
                        value={name}
                        placeholder={t('createAccount.name')}
                        errorMessage={invalidNameMessage ? invalidNameMessage : null}
                    />
                </View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={(value) => { handleEmail(value) }}
                        value={mail}
                        placeholder={t('login.mail')}
                        keyboardType="email-address"
                        autoComplete="email"
                        errorMessage={invalidEmailMessage ? invalidEmailMessage : null}
                    />
                </View>
                <View style={styles.inputes}>
                    <MaskInput style={styles.inputMask}
                        onChangeText={(_, unmasked) => { setPhone(unmasked); }}
                        value={phone}
                        placeholder={t('createAccount.phone')}
                        mask={Masks.BRL_PHONE}
                    />
                </View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={setPassword}
                        value={password}
                        placeholder={t('login.password')}
                        secureTextEntry={true}
                    /></View>
                <View style={styles.inputes}>
                    <Input
                        onChangeText={setPasswordConfirm}
                        value={passwordConfirm}
                        placeholder={t('createAccount.confirmPassword')}
                        secureTextEntry={true}
                    />
                </View>
            </View>

            <View style={styles.confirmationButton}>
                {
                    !loading ?
                        <DoubleButtonConfirmation
                            handleConfirm={handleConfirmButton}
                            handleBack={handleBack} />
                        :
                        <Loading loading={loading} size={18} />
                }
            </View>

        </View>
    )
}