import styled from "styled-components/native";

export const Container = styled.View`
    width:40%;
    height:160px;
    border: 1px solid #e5e5e5;
    background-color: #e0e0e0;
    align-items:center;
    justify-content:center;
    margin:10px;
`

export const TextDescription = styled.Text`
    color: #606060;
    padding:15px;
    padding-bottom:5px;
    text-align:center;
    font-size:24px;
    font-weight:900;

`
export const TextContent = styled.Text`
    color:#444444;
    font-size:50px;
    font-weight:600;
`
export const InfoContainer = styled.View`
    flex-direction:column;
    width:50%;
`
export const ButtonsContainer = styled.View`
    width:50%;
    flex-direction:row;
`