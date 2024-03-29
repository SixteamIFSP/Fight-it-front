import styled from 'styled-components/native'

export const Container = styled.ScrollView`
    flex:1;
    width:100%;
    overflow: visible;
`;
export const TextHeader = styled.Text`
    width:100%;
    margin:10px;
    margin-left:0px;
    text-align:center;
    font-size:22px;
`;
export const ConteinerInfo = styled.View`
    border-top-width:6px;
    border-top-color: #3d3d3d;
    margin-left:auto;
    margin-right:auto;
    width:90%;
    padding:20px;
    border-width:0.5px;
    border-radius: 4px;
    background-color: white;
`;
export const TextAlingLine = styled.View`
    flex-direction:row;
    align-items:center;
    margin-bottom:10px;
`;
export const TextDescription = styled.Text`
    font-size:18px;
    text-align:left;
    margin-right:10px;
    margin-left:10px;
    margin-top:16px;
`;
export const TextInfo = styled.Text`
    width:80%;
    text-align:left;
    font-size:18px;
    flex-wrap: wrap;
    width: 100%;
  
`;
export const RowConfirmation = styled.View`
    width:100%;
    flex-direction:row;
    justify-content:flex-end;
    align-items:center;
`;
export const ContainerSVG = styled.TouchableOpacity`
    width:40px;
    height:40px;
    justify-content:center;
    align-items:center;
`;
export const ContainerCancelButton = styled.TouchableOpacity`
    width:50%;
    margin-top: 25px;
    margin-left:auto;
    margin-right: auto;
`;
export const CancelButton = styled.Text`
    text-align:center;
    padding:5px;
    font-size:14px;
    font-weight:bold;
    border-color:black;
    border-width:1px;
    border-radius:5px;
    background-color:rgb(221, 221, 221);
`;
export const ButtonConfigure = styled.TouchableOpacity`
    width:75%;
    margin-top:30px;
    margin-bottom:30px;
    padding:5px;
    border-color:black;
    border-width:1px;
    border-radius:5px;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    background-color: white;
`;
export const TextButton = styled.Text`
    text-align:center;
    font-size:14px;
    font-weight:bold;
    width: 100%;
`;
export const ConteinerInfoDelete = styled.View`
    width:90%;
    padding: 20px;
    height:auto;
    margin-bottom:16px;
    margin-right: auto;
    margin-left: auto;
    border-color:black;
    border-width:0.5px;
    border-radius:4px;
    background-color: white;
    border-top-width:6px;
    border-top-color: #ce0000;
    border-style: solid;
`;

export const ContainerImage = styled.View`
    width:100%;
    height:15%;
    align-items:center;
    justify-content: center;
`
export const AreaImage = styled.View`
    width: 70px;
    height: 70px;
    overflow:hidden;
    border-radius:50px;
`;
export const ButtonImage = styled.TouchableOpacity`
    width:100%;
    height:100%;
    background-color:#3d3d3d;
    align-items:center;
    justify-content: center; 
`;
export const HorizontalButtonsContainer = styled.TouchableOpacity`
    width: 100%;
    height: 50%;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom:16px;
`;
export const ConfirmButton = styled.Text`
    text-align:center;
    padding:5px;
    font-weight:bold;
    border-color:black;
    border-width:0.5px;
    border-radius:5px;
    background-color:rgb(221, 221, 221);
    width:40%;
    height: 100%;
`;
export const DeleteAccountButton = styled.Text`
    text-align:center;
    padding:5px;
    font-size:14px;
    font-weight:bold;
    border-color:black;
    border-width:0.5px;
    border-radius:5px;
    background-color:rgb(221, 221, 221);
    width:40%;
    height: 100%;
`;

export const SaveButton = styled.TouchableOpacity`
 background-color:#3d3d3d;
 padding: 10px 20px;
 border-radius: 3px;
`

export const SaveButtonText = styled.Text`
   color:rgb(221, 221, 221);

`

