import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Button, Modal } from 'react-native'
import Foto from './Foto'
import estilo from '../../estilo'
import { useFonts } from 'expo-font'
import { printToFileAsync } from 'expo-print'
import { shareAsync } from 'expo-sharing'
import NetInfo from "@react-native-community/netinfo"
import { updateDoc } from 'firebase/firestore'

export default ({ aluno, navigation }) => {
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../../assets/Montserrat-Regular.ttf'),
    })
    const data = new Date()
    const anoAux = data.getFullYear()

    const html = `
            <div style="width: 100%; height: 100%; position: relative; background: white">
                <div style="width: 220px; height: 78px; left: 0px; top: 25px; position: absolute">
                    <div style="width: 154px; height: 27px; left: 60px; top: 35px; position: absolute">
                        <div style="width: 80.63px; height: 27px; left: 115.37px; top: -0px; position: absolute; text-align: center; color: #0066FF; font-size: 28px; font-family: Roboto; font-weight: 400; line-height: 30px; letter-spacing: 0.50px; word-wrap: break-word">App</div>
                        <div style="width: 128.37px; height: 27px; left: 0px; top: 0px; position: absolute; text-align: center"><span style="color: #182128; font-size: 28px; font-family: Roboto; font-weight: 400; line-height: 30px; letter-spacing: 0.50px; word-wrap: break-word">ShapeMe<br/></span>
                        <span style="color: #182128; font-size: 20px; font-family: Roboto; font-weight: 400; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word"><br/></span>
                        </div>
                    </div>
                </div>
                <div style="width: 500px; height: 0px; left: 48px; top: 103px; position: absolute; border: 0.50px black solid"></div>
                <div style="width: 375px; height: 43px; left: 110px; top: 125px; position: absolute; text-align: center; color: black; font-size: 32px; font-family: Roboto; font-weight: 400; line-height: 38.40px; letter-spacing: 0.64px; word-wrap: break-word">
                    Informações do usuário
                </div>
                <div style="width: 75px; height: 15px; left: 48px; top: 190px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Nome 
                </div>
                <div style="width: 75px; height: 15px; left: 48px; top: 259px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    CPF
                </div>
                <div style="width: 193px; height: 15px; left: 202px; top: 259px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Data de nascimento
                </div>
                <div style="width: 169px; height: 25px; left: 48px; top: 222px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.nome}
                </div>
                <div style="width: 169px; height: 25px; left: 48px; top: 291px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.cpf}
                </div>
                <div style="width: 169px; height: 25px; left: 202px; top: 291px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.diaNascimento}/${aluno.mesNascimento}/${aluno.anoNascimento}
                </div>
                <div style="width: 193px; height: 15px; left: 416px; top: 259px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Telefone
                </div>
                <div style="width: 169px; height: 25px; left: 416px; top: 291px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.telefone}
                </div>
                <div style="width: 95px; height: 15px; left: 48px; top: 567px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Academia
                </div>
                <div style="width: 193px; height: 15px; left: 347px; top: 567px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Professor
                </div>
                <div style="width: 169px; height: 25px; left: 48px; top: 599px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.Academia}
                </div>
                <div style="width: 169px; height: 25px; left: 347px; top: 599px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.professorResponsavel}
                </div>
                <div style="width: 193px; height: 15px; left: 347px; top: 185px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Idade
                </div>
                <div style="width: 169px; height: 25px; left: 347px; top: 217px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${anoAux - aluno.anoNascimento}
                </div>
                <div style="width: 75px; height: 15px; left: 48px; top: 397px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    CEP
                </div>
                <div style="width: 193px; height: 15px; left: 202px; top: 397px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Rua
                </div>
                <div style="width: 169px; height: 25px; left: 48px; top: 429px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.endereco.cep}
                </div>
                <div style="width: 169px; height: 25px; left: 202px; top: 429px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.endereco.rua}
                </div>
                <div style="width: 193px; height: 15px; left: 416px; top: 397px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Bairro
                </div>
                <div style="width: 75px; height: 15px; left: 48px; top: 466px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Cidade
                </div>
                <div style="width: 193px; height: 15px; left: 202px; top: 466px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Número
                </div>
                <div style="width: 169px; height: 25px; left: 48px; top: 498px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.endereco.cidade}
                </div>
                <div style="width: 169px; height: 25px; left: 202px; top: 498px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.endereco.numero}
                </div>
                <div style="width: 193px; height: 15px; left: 416px; top: 466px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Complemento
                </div>
                <div style="width: 169px; height: 25px; left: 416px; top: 498px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.endereco.complemento}
                </div>
                <div style="width: 169px; height: 25px; left: 416px; top: 429px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.endereco.bairro}
                </div>
                <div style="width: 95px; height: 15px; left: 48px; top: 328px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Email
                </div>
                <div style="width: 193px; height: 15px; left: 202px; top: 328px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Profissão
                </div>
                <div style="width: 169px; height: 25px; left: 48px; top: 360px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.email}
                </div>
                <div style="width: 169px; height: 25px; left: 202px; top: 360px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.profissao}
                </div>
                <div style="width: 193px; height: 15px; left: 416px; top: 328px; position: absolute; color: black; font-size: 20px; font-family: Roboto; font-weight: 700; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word">
                    Sexo
                </div>
                <div style="width: 169px; height: 25px; left: 416px; top: 360px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 400; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                    ${aluno.sexo}
                </div>
            </div>

    `;
    const parq = `

        <div style="width: 595px; height: 842px; position: relative; background: white">
            <div style="width: 220px; height: 78px; left: 0px; top: 25px; position: absolute">
                <div style="width: 154px; height: 27px; left: 60px; top: 35px; position: absolute">
                    <div style="width: 80.63px; height: 27px; left: 115.37px; top: -0px; position: absolute; text-align: center; color: #0066FF;  font-size: 28px; font-family: Roboto; font-weight: 400; line-height: 30px; letter-spacing: 0.50px; word-wrap: break-word">App</div>
                    <div style="width: 128.37px; height: 27px; left: 0px; top: 0px; position: absolute; text-align: center"><span style="color: #182128; font-size: 28px; font-family: Roboto; font-weight: 400; line-height: 30px; letter-spacing: 0.40px; word-wrap: break-word">ShapeMe<br/></span>
                    <span style="color: #182128; font-size: 20px; font-family: Roboto; font-weight: 400; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word"><br/></span>
                    </div>
                </div>
            </div>
            <div style="width: 500px; height: 0px; left: 48px; top: 103px; position: absolute; border: 0.50px black solid"></div>
            <div style="width: 375px; height: 43px; left: 110px; top: 125px; position: absolute; text-align: center; color: black; font-size: 32px; font-family: Roboto; font-weight: 400; line-height: 38.40px; letter-spacing: 0.64px; word-wrap: break-word">
                PAR-Q & Você
            </div>
            <div style="width: 500px; height: 32px; left: 48px; top: 168px; position: absolute; text-align: center; color: black; font-size: 12px; font-family: Montserrat; font-weight: 400; line-height: 13.20px; word-wrap: break-word">
                Questionário de Prontidão para Atividade Física (Revisado em 1994). Para pessoas com idade entre 15 e 69 anos.
            </div>
            <div style="width: 500px; height: 162px; left: 47px; top: 208px; position: absolute; color: #182128; font-size: 12px; font-family: Montserrat; font-weight: 400; line-height: 13.20px; word-wrap: break-word">
                    A atividade física regular é divertida e saudável e cada vez mais pessoas estão começando a se tornar mais ativas todos os dias. Ser ativo é muito seguro para a maioria das pessoas. No entanto, algumas pessoas devem consultar um médico antes de começar a se tornar muito mais fisicamente ativo.<br/>    
                    Se você está planejando tornar-se muito mais fisicamente ativo do que você é agora, comece respondendo as sete perguntas do quadro abaixo. Se tiver entre 15 e 69 anos de idade, o PAR-Q informará se você deve consultar o seu médico antes de começar. Se você tem mais de 69 anos de idade, e você não está acostumado a ser muito ativo, consulte seu médico.<br/>    
                    O bom senso é seu melhor guia ao responder a estas perguntas. Por favor, leia as perguntas cuidadosamente e responda a cada uma honestamente marcando com SIM ou NÃO.
            </div>
            <div style="width: 501px; height: 304px; left: 47px; top: 385px; position: absolute">
                <span style="color: #182128; font-size: 12px; font-family: Montserrat; font-weight: 400; line-height: 13.20px; word-wrap: break-word">Seu médico já disse que você possui doença cardíaca e  recomendou atividades físicas apenas sob supervisão médica?   </span>
                <span style="color: #182128; font-size: 16px; font-family: Montserrat; font-weight: 400; line-height: 17.60px; word-wrap: break-word">${aluno.PARQ.pergunta1}<br/></span>
                <span style="color: #182128; font-size: 12px; font-family: Montserrat; font-weight: 400; line-height: 13.20px; word-wrap: break-word">Você apresenta dor no peito ao realizar atividade física?  </span>
                <span style="color: #182128; font-size: 16px; font-family: Montserrat; font-weight: 400; line-height: 17.60px; word-wrap: break-word">${aluno.PARQ.pergunta2}<br/></span>
                <span style="color: #182128; font-size: 12px; font-family: Montserrat; font-weight: 400; line-height: 13.20px; word-wrap: break-word">No último mês você sentiu dor no peito quando não estava praticando atividade física?  </span>
                <span style="color: #182128; font-size: 16px; font-family: Montserrat; font-weight: 400; line-height: 17.60px; word-wrap: break-word">${aluno.PARQ.pergunta3}<br/></span>
                <span style="color: #182128; font-size: 12px; font-family: Montserrat; font-weight: 400; line-height: 13.20px; word-wrap: break-word">Você perde o equilíbrio em virtude de tonturas ou já perdeu a consciência alguma vez?  </span>
                <span style="color: #182128; font-size: 16px; font-family: Montserrat; font-weight: 400; line-height: 17.60px; word-wrap: break-word">${aluno.PARQ.pergunta4}<br/></span>
                <span style="color: #182128; font-size: 12px; font-family: Montserrat; font-weight: 400; line-height: 13.20px; word-wrap: break-word">Você tem algum problema ósseo ou articular que poderia ser agravado por uma mudança em sua atividade?  </span>
                <span style="color: #182128; font-size: 16px; font-family: Montserrat; font-weight: 400; line-height: 17.60px; word-wrap: break-word">${aluno.PARQ.pergunta5}<br/></span>
                <span style="color: #182128; font-size: 12px; font-family: Montserrat; font-weight: 400; line-height: 13.20px; word-wrap: break-word">Atualmente seu médico está prescrevendo medicamentos (ex. diuréticos) para sua pressão arterial ou doença cardíaca?  </span>
                <span style="color: #182128; font-size: 16px; font-family: Montserrat; font-weight: 400; line-height: 17.60px; word-wrap: break-word">${aluno.PARQ.pergunta6}<br/></span>
                <span style="color: #182128; font-size: 12px; font-family: Montserrat; font-weight: 400; line-height: 13.20px; word-wrap: break-word">Você tem conhecimento de qualquer outra razão pela qual não deveria realizar atividade física?<br/></span>
                <span style="color: #182128; font-size: 16px; font-family: Montserrat; font-weight: 400; line-height: 17.60px; word-wrap: break-word">${aluno.PARQ.pergunta6}</span>
            </div>
        </div>
        <br>
        <br>
        <br>
        <br>
        <br>

    `;

    const anamnese = `

        <div style="width: 595px; height: 842px; position: relative; background: white">
            <div style="width: 220px; height: 78px; left: 0px; top: 25px; position: absolute">
                <div style="width: 154px; height: 27px; left: 60px; top: 35px; position: absolute">
                    <div style="width: 80.63px; height: 27px; left: 115.37px; top: -0px; position: absolute; text-align: center; color: #0066FF;  font-size: 28px; font-family: Roboto; font-weight: 400; line-height: 30px; letter-spacing: 0.50px; word-wrap: break-word">App</div>
                    <div style="width: 128.37px; height: 27px; left: 0px; top: 0px; position: absolute; text-align: center"><span style="color: #182128;  font-size: 28px; font-family: Roboto; font-weight: 400; line-height: 30px; letter-spacing: 0.50px; word-wrap: break-word">ShapeMe<br/></span>
                    <span style="color: #182128; font-size: 20px; font-family: Roboto; font-weight: 400; line-height: 24px; letter-spacing: 0.40px; word-wrap: break-word"><br/></span>
                    </div>
                </div>
            </div>
            <div style="width: 500px; height: 0px; left: 48px; top: 103px; position: absolute; border: 0.50px black solid"></div>
            <div style="width: 375px; height: 43px; left: 110px; top: 125px; position: absolute; text-align: center; color: black; font-size: 32px; font-family: Roboto; font-weight: 400; line-height: 38.40px; letter-spacing: 0.64px; word-wrap: break-word">
                ANAMNESE
            </div>
            <div style="width: 178px; height: 15px; left: 48px; top: 201px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Tipo Sanguíneo
            </div>
            <div style="width: 169px; height: 25px; left: 48px; top: 233px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.tipoSanguineo} ${aluno.Anamnese.fatorRH}
            </div>
            <div style="width: 178px; height: 15px; left: 351px; top: 258px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Há quanto tempo?
            </div>
            <div style="width: 169px; height: 25px; left: 351px; top: 290px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.tempoQuePraticaMusculacao}
            </div>
            <div style="width: 398px; height: 15px; left: 48px; top: 384px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Faz uso de algum medicamento regularmente?Qual?
            </div>
            <div style="width: 169px; height: 25px; left: 48px; top: 416px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.usoDeMedicamento}
            </div>
            <div style="width: 398px; height: 15px; left: 48px; top: 636px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Comentários adicionais:
            </div>
            <div style="width: 169px; height: 25px; left: 48px; top: 668px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.possuiAlergiaMedicamento}
            </div>
            <div style="width: 142px; height: 15px; left: 351px; top: 699px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Objetivo de treino:
            </div>
            <div style="width: 60px; height: 25px; left: 351px; top: 731px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.objetivo}
            </div>
            <div style="width: 231px; height: 15px; left: 48px; top: 699px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Você teve ou tem atualmente:
            </div>
            <div style="width: 169px; height: 25px; left: 48px; top: 731px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.ataqueCardiaco == 'Sim' ? `<b>Um ataque cardíaco?</b> ${aluno.Anamnese.ataqueCardiaco}` : ''}
                ${aluno.Anamnese.doencaDasValvulasCardiacas == 'Sim' ? ` <b>Doença das válvulas cardíacas?</b>${aluno.Anamnese.doencaDasValvulasCardiacas} <br>` : ''}
                ${aluno.Anamnese.cirurgiaCardiaca == 'Sim' ? `<b>Cirurgia cardíaca?</b>${aluno.Anamnese.cirurgiaCardiaca}` : ''}
                ${aluno.Anamnese.cateterismoCardiaco == 'Sim' ? `<b>Cateterismo cardíaco?</b>${aluno.Anamnese.cateterismoCardiaco} <br>` : ''}
                ${aluno.Anamnese.angioplastiaCoronaria == 'Sim' ? `<b>Angioplastia coronária?</b> ${aluno.Anamnese.angioplastiaCoronaria}` : ''}
                ${aluno.Anamnese.marcaPasso == 'Sim' ? `<b>Marca-passo? </b>${aluno.Anamnese.marcaPasso} <br>` : ''}
                ${aluno.Anamnese.desfibriladorCardiacoImplantavel == 'Sim' ? `<b>Desfibrilador cardíaco implantável?</b>${aluno.Anamnese.desfibriladorCardiacoImplantavel}` : ''}
                ${aluno.Anamnese.disturbioDoRitmoCardiaco == 'Sim' ? `<b>Distúrbio do ritmo cardíaco?</b>${aluno.Anamnese.disturbioDoRitmoCardiaco}` : ''}
                ${aluno.Anamnese.insuficienciaCardiaca == 'Sim' ? `<b>Insuficiência cardíaca?</b>${aluno.Anamnese.insuficienciaCardiaca}` : ''}
                ${aluno.Anamnese.cardioPatiaCongenita == 'Sim' ? `<b>Cardiopatia congênita?</b>${aluno.Anamnese.cardioPatiaCongenita}` : ''}
                ${aluno.Anamnese.transplanteDeCoracao == 'Sim' ? `<b>Transplante de coração?</b>${aluno.Anamnese.transplanteDeCoracao}` : ''}
                ${aluno.Anamnese.doencaRenal == 'Sim' ? `<b>Doença renal?</b>${aluno.Anamnese.doencaRenal}` : ''}
                ${aluno.Anamnese.diabetes == 'Sim' ? `<b>Diabetes?</b>${aluno.Anamnese.diabetes}` : ''}
                ${aluno.Anamnese.asma == 'Sim' ? `<b>Asma?</b>${aluno.Anamnese.asma}` : ''}
                ${aluno.Anamnese.doencaPulmonar == 'Sim' ? `<b>Doença pulmonar?</b>${aluno.Anamnese.doencaPulmonar}` : ''}
            </div>
            <div style="width: 398px; height: 15px; left: 48px; top: 573px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Alguma lesão muscular, óssea ou articular?
            </div>
            <div style="width: 169px; height: 25px; left: 48px; top: 605px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.lesao}
            </div>
            <div style="width: 398px; height: 15px; left: 48px; top: 510px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Histórico de câncer; em caso afirmativo, qual tipo?
            </div>
            <div style="width: 169px; height: 25px; left: 48px; top: 542px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.historicoDeCancer}
            </div>
            <div style="width: 398px; height: 15px; left: 48px; top: 447px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Possui alergia a algum tipo de medicamento?Qual?
            </div>
            <div style="width: 169px; height: 25px; left: 48px; top: 479px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.possuiAlergiaMedicamento}
            </div>
            <div style="width: 186px; height: 15px; left: 351px; top: 321px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Há quanto tempo parou?
            </div>
            <div style="width: 169px; height: 25px; left: 351px; top: 353px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.tempoQueParouDePraticarMusculacao}
            </div>
            <div style="width: 178px; height: 15px; left: 48px; top: 321px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Se não, já praticou?
            </div>
            <div style="width: 169px; height: 25px; left: 48px; top: 353px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.jaPraticouMusculacao}
            </div>
            <div style="width: 246px; height: 15px; left: 48px; top: 258px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Pratica musculação atualmente?
            </div>
            <div style="width: 169px; height: 25px; left: 48px; top: 290px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
                ${aluno.Anamnese.praticaMusculacaoAtualmente}
            </div>
            <div style="width: 178px; height: 15px; left: 351px; top: 201px; position: absolute; color: black; font-size: 16px; font-family: Roboto; font-weight: 700; line-height: 19.20px; letter-spacing: 0.32px; word-wrap: break-word">
                Gravidez?
            </div>
            <div style="width: 169px; height: 25px; left: 351px; top: 233px; position: absolute; color: black; font-size: 14px; font-family: Roboto; font-weight: 400; line-height: 16.80px; letter-spacing: 0.28px; word-wrap: break-word">
             ${aluno.Anamnese.gravida}
            </div>

        </div>
`;

    const htmlCombinado =
        `<html>
        <body>
           ${html}
           ${parq}
           ${anamnese} 
        </body>
    </html>`

    const [conexao, setConexao] = useState(false)
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const gerarPdf = async () => {
        const arquivo = await printToFileAsync({
            html: htmlCombinado,
            base64: false
        });

        await shareAsync(arquivo.uri)
    }

    const [modalVisible, setModalVisible] = useState(false)
    const [turmas, setTurmas] = useState([])
    const [carregouTurma, setCarregouTurma] = useState(false)
    const trocarTurma = async () => {
            try {
                const db = getFirestore();
                const academiasRef = collection(db, "Academias");
                const academiaQuery = query(academiasRef, where("nome", "==", selectedOption));
                const academiaSnapshot = await getDocs(academiaQuery);

                if (!academiaSnapshot.empty) {
                    const academiaDoc = academiaSnapshot.docs[0];

                    const turmasRef = collection(academiaDoc.ref, "Turmas")
                    const turmas = []

                    const turmasSnapshot = await getDocs(turmasRef)
                    turmasSnapshot.forEach((doc) => {
                        const nome = doc.data().nome
                        turmas.push(nome)
                        console.log(nome)
                    })

                    setCarregouTurma(true)
                    setTurmas(turmas)
                }
            } catch (error) {
                console.log(error);
            }
        setModalVisible(true)
    }

    const handleSelectChangeTurma = (value) => {
        setSelectedOptionTurma(value);
    }

    console.log(aluno.PARQ)
    return (
        <View style={[estilo.corLight, style.container, estilo.centralizado, estilo.sombra]}>
            <View style={[style.areaConteudos]}>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>DATA DE NASCIMENTO:</Text>
                <View style={style.areaRespostas}>
                    <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{`${aluno.diaNascimento}/${aluno.mesNascimento}/${aluno.anoNascimento}`}</Text>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>TURMA:</Text>
                <View style={style.areaRespostas}>
                    <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.turma}</Text>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>PROFESSOR RESPONSÁVEL:</Text>
                <View style={style.areaRespostas}>
                    <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.professorResponsavel}</Text>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>CONTATO DE EMERGÊNCIA:</Text>
                <View style={style.areaRespostas}>
                    <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.telefone}</Text>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>TIPO SANGUÍNEO:</Text>
                <View style={style.areaRespostas}>
                    <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.tipoSanguineo}</Text>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>MEDICAMENTOS REGULARES:</Text>
                <View style={style.areaRespostas}>
                    <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.usoDeMedicamento == '' ? "Nenhum" : aluno.Anamnese.usoDeMedicamento}</Text>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>ALERGIA A MEDICAÇÃO:</Text>
                <View style={style.areaRespostas}>
                    <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.possuiAlergiaMedicamento == '' ? "Nenhum" : aluno.Anamnese.possuiAlergiaMedicamento}</Text>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>HISTÓRICO MÉDICO:</Text>
                <View style={style.areaRespostas}>
                    <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.comentariosMedicos == '' ? "Nenhum" : aluno.Anamnese.comentariosMedicos}</Text>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>OBJETIVO DE TREINO:</Text>
                <View style={style.areaRespostas}>
                    <Text style={[estilo.textoCorSecundaria, style.textoRespostas, style.Montserrat, estilo.textoP16px]}>{aluno.Anamnese.objetivo}</Text>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat]}>PARQ:</Text>
                <View>
                    <TouchableOpacity style={[style.botao, estilo.corPrimaria]} onPress={() => { navigation.navigate("PARQ", { parq: aluno.PARQ }) }}>
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>VISUALIZAR PARQ</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat, { marginTop: '3%' }]}>Anamnese:</Text>
                <View>
                    <TouchableOpacity style={[style.botao, estilo.corPrimaria]} onPress={() => { navigation.navigate("Anamnese", { aluno: aluno }) }}>
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>VISUALIZAR ANAMNESE</Text>
                    </TouchableOpacity>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat, { marginTop: '3%' }]}>Frequência:</Text>
                    <View>
                        <TouchableOpacity style={[style.botao, conexao ? estilo.corPrimaria : estilo.corDisabled]} disabled={!conexao} onPress={() => { navigation.navigate("Frequencia do aluno", { aluno: aluno }) }}>
                            <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>VISUALIZAR PRESENÇA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat, { marginTop: '3%' }]}>Exportar PARQ e Anamnese:</Text>
                <View>
                    <TouchableOpacity style={[style.botao, estilo.corPrimaria]} onPress={() => gerarPdf()}>
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>EXPORTAR DADOS</Text>
                    </TouchableOpacity>
                </View>

                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat, { marginTop: '3%' }]}>TROCAR TURMA:</Text>
                <View>
                    <TouchableOpacity style={[style.botao, conexao? estilo.corPrimaria : estilo.corDisabled]} disabled={!conexao} onPress={() => navigation.navigate('Trocar turma', {aluno})}>
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>TROCAR TURMA</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[estilo.textoSmall12px, estilo.textoCorSecundaria, estilo.Montserrat, { marginTop: '3%' }]}>{!aluno.inativo? "INATIVAR" : "ATIVAR"} ALUNO:</Text>
                <View>
                    <TouchableOpacity style={[style.botao, conexao? estilo.corPrimaria : estilo.corDisabled]} disabled={!conexao} onPress={() => navigation.navigate('Inativar aluno', {aluno, inativo: aluno.inativo})}>
                        <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>{!aluno.inativo? "INATIVAR" : "ATIVAR"} ALUNO</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>


    )
}


const style = StyleSheet.create({
    container: {
        width: '80%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#0066FF'
    },
    Montserrat: {
    },
    areaTexto: {
        marginTop: '5%'
    },
    areaConteudos: {
        marginLeft: '8%',
        marginTop: '8%',
        marginBottom: '8%'
    },
    areaRespostas: {
        width: '90%',
        marginVertical: '3%'
    },
    textoRespostas: {
        fontWeight: 'bold',
    },
    botao: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        width: '90%',
        borderRadius: 30,
        marginTop: 10,
    },
})