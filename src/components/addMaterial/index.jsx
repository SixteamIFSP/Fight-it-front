import { useEffect, useState } from "react"
import { View , Text , Image} from "react-native"
import * as ImagePicker from 'expo-image-picker';
import { ButtonContainer, Container, Descricao, NomeMaterial, Texto } from "./styles";
import { Input } from "../input";
import { toastMessage } from "../../utils/toastMessage";
import { justUploadImage } from "../../controler/image";
import { postMaterialExtra } from "../../controler/materialExtra";
import { BackButtonContainer } from "../../screen/AlunoViewMaterial/style";
import { Button } from "../button";
import { useTranslation } from "react-i18next";

export function AddMaterial({ aula, goBack }) { 
    const [image, setImage] = useState()
    const [descricao, setDescricao] = useState()
    const [invalidDescricao, setInvalidDescricao] = useState('')
    const [nomeMaterial, setNomeMaterial] = useState()
    const [invalidNomeMaterial, setInvalidNomeMaterial] = useState('')

    const {t} = useTranslation();

   async function permissionToAccessMedia() { 
        const cameraRollStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraRollStatus.status !== "granted") {
        alert("Usuario sem permissão para utilizar mídias");
        return false 
     }
      return true 
    }

     async function selectImage() {
        if(!permissionToAccessMedia()) return 
        let result = await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          })
          setImage(result)
    }
    
    async function sendMaterialExtra() { 
        if(!validateFields()) return 
        const response =  await justUploadImage(image);
        // NomeMaterial, Descricao, AulaId, S3Key 
        postMaterialExtra(nomeMaterial, descricao, aula.id, response?.Key);
        goBack();
    }

   function validateFields() { 
      if(!nomeMaterial) {
          setInvalidNomeMaterial('Nome do material inválido!');
           return false 
      } else if (!descricao) { 
          setInvalidDescricao('Descrição inválida!');
          return false 
      } else if(!image.uri) {
         toastMessage(false , 'Selecione uma imagem/material para envio!');
         return false 
      }
      return true 
   }

   function  handleNomeMaterial(value) { 
    setNomeMaterial(value);
    setInvalidNomeMaterial('');
    }

   function handleDescricao(value) { 
    setDescricao(value);
    setInvalidDescricao(false);
   }

    return (
        <Container>
           <Text> Aula: {aula?.nometurma}</Text>
           <NomeMaterial>
              <Input 
                style={{ borderColor: `${invalidNomeMaterial ? 'red' : 'black'}` }}
                onChangeText={(value) => { handleNomeMaterial(value) }}
                value={nomeMaterial}
                maxLength={100}
                placeholder={'Nome do material'}
                errorMessage={invalidNomeMaterial || ''}
              />
           </NomeMaterial>
           <Descricao>
              <Input 
              style={{ borderColor: `${invalidDescricao ? 'red' : 'black'}` }}
              onChangeText={(value) => { handleDescricao(value) }}
              value={descricao}
              maxLength={40}
              placeholder={'Descrição'}
              errorMessage={invalidDescricao || ''}
              />
           </Descricao>

           {image?.uri && <Image source={{uri: image.uri, height: 200, width: 200}}  /> }
           <ButtonContainer onPress={selectImage} ><Texto>Selecionar imagem</Texto></ButtonContainer>
           <ButtonContainer onPress={sendMaterialExtra} ><Texto>Enviar Material Extra</Texto></ButtonContainer>
        
            <BackButtonContainer>
                <Button handle={goBack} text={t('loadingClass.backButton')}></Button>
            </BackButtonContainer>
        </Container>
        
    )
}