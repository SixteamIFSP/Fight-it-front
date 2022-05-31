import styled from "styled-components/native";

export const Container = styled.View`
    flex:1;
    width:100%;
    
`;

export const ContainerButtons = styled.View`
    width:100%;
    justify-content:center;
    align-self: center;
`;

export const ContentButtons = styled.TouchableOpacity`
    width:100%;
    padding:5%; 
`;

export const TextButtons = styled.Text`
    width:100%;
    text-align:center;
    padding:10px;
    border-width:1px;
    border-color:black;
`;

export const ContainerDesempenho = styled.ScrollView`
    width:100%;
`;

export const DesempenhoHeader = styled.Text`
    padding:5%;
    font-size:20px;
    border-bottom-color:black;
    border-width:1px;
    border-top-width:0;
    border-left-width:0;
    border-right-width:0;

`;