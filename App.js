import React, {useState, useEffect} from 'react'
import { Text, View, ScrollView } from 'react-native';
import Logo from './componentes/Logo';
import LoginScreen from './componentes/LoginScreen';
import Home from './componentes/Home';
import SelecaoAluno from './componentes/SelecaoAluno';
import ListaAlunos from './componentes/SelecaoAluno/ListaAlunos';
import PerfilDoAluno from './componentes/SelecaoAluno/PerfilDoAluno';
import Caixinha from './componentes/SelecaoAluno/PerfilDoAluno/Caixinha';
import Parq from './componentes/Parq';
import Anamnese from './componentes/Anamnese';
import DadosCorporais from './componentes/NovaAvaliacao/DadosCorporais';
import SentarAlcancar from './componentes/NovaAvaliacao/Testes/Tabelas/SentarAlcancar';
import Avaliacoes from './componentes/Avaliacoes';
import TestesParte1 from './componentes/NovaAvaliacao/Testes/TestesParte1';
import ResistenciaAbdominal from './componentes/NovaAvaliacao/Testes/Tabelas/ResistenciaAbdominal';
import ResistenciaAbdominal18anos from './componentes/NovaAvaliacao/Testes/Tabelas/ResistenciaAbdominal18anos';
import TestesPart2 from './componentes/NovaAvaliacao/Testes/TestesPart2';
import IMC from './componentes/NovaAvaliacao/Testes/Tabelas/IMC';
import PressaoArterial from './componentes/NovaAvaliacao/Testes/Tabelas/PressaoArterial';
import FrequenciaCardiacaDeRepouso from './componentes/NovaAvaliacao/Testes/Tabelas/FrequenciaCardiacaDeRepouso';
import TestesParte3 from './componentes/NovaAvaliacao/Testes/TestesParte3';
import TabelaDeResultados from './componentes/NovaAvaliacao/Testes/Tabelas/TabelaDeResultados';
import FinalizarTestes from './componentes/NovaAvaliacao/FinalizarTestes';
import AvisoAvaliacaoFinalizada from './componentes/NovaAvaliacao/AvisoAvaliacaoFinalizada';
import MontarTreino from './componentes/MontarTreino';
import Routes from './componentes/Routes/estilo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PerfilProfessor from './componentes/PerfilProfessor';
import EditarFoto from './componentes/PerfilProfessor/EditarFoto';
import Notificacoes from './componentes/Notificacoes';
import CadastroScreen from './componentes/CadastroScreen/index.js';
import ModalSemConexao from './componentes/ModalSemConexao';
import SelecaoAlunoAvaliacao from './componentes/MontarTreino/SelecaoAlunoAvaliacao';
import SelecaoAlunoAnaliseProgramaDeTreino from './componentes/AnaliseDoProgramaDeTreino/SelecaoAlunoAnaliseProgramaDeTreino';
import TelaAnaliseDoProgramaDeTreino from './componentes/TelaAnaliseDoProgramaDeTreino';
import TelasDeEvolucao from './componentes/TelasDeEvolucao';
import SelecaoDaEvolucao from './componentes/TelasDeEvolucao/GraficosEvolutivos/SelecaoDaEvolucao';
import EvolucaoCorporal from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoCorporal';
import EvolucaoDoExercicioSelecao from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoDoExercicioSelecao';
import EvolucaoDoExercicio from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoDoExercicio';
import EvolucaoDosTestes from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoDosTestes';
import EvolucaoPse from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoPse';
import EvolucaoQTR from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoQTR';
import EvolucaoCIT from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoCIT';
import EvolucaoMonotonia from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoMonotonia';
import EvolucaoStrain from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoStrain';
import Chat from './componentes/Chat';
import Mensagens from './componentes/Chat/Mensagens';
import EvolucaoPSEDoExercicioSelecao from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoPSEDoExercicioSelecao';
import EvolucaoPseBorg from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoPseBorg';
import NovaAvaliacao from './componentes/NovaAvaliacao';
import FrequenciaAluno from './componentes/SelecaoAluno/PerfilDoAluno/FrequenciaAluno';
import * as Notification from "expo-notifications"
import SelecaoDoExercicio from './componentes/MontarTreino/SelecaoDoExercicio';
import AdicionaisExercicio from './componentes/MontarTreino/SelecaoDoExercicio/AdicionaisExercicio';
import NovaFicha from './componentes/MontarTreino/NovaFicha';
import ExportCSV from './componentes/ExportCSV/index.js';
import SelecaoAlunoExport from './componentes/ExportCSV/SelecaoAlunoExport.js';
import TransferirAluno from './componentes/SelecaoAluno/PerfilDoAluno/TransferirAluno.js';

const Stack = createNativeStackNavigator();

Notification.setNotificationHandler({
  handleNotification:  async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true, 
    shouldSetBadge: true
  })
})

export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Principal" component={Routes} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil Aluno" component={PerfilDoAluno}/>
        <Stack.Screen name="PARQ" component={Parq}/>
        <Stack.Screen name="Anamnese" component={Anamnese}/>
        <Stack.Screen name="Montar treino" component={MontarTreino}/>
        <Stack.Screen name="Cadastro" component={CadastroScreen}/>
        <Stack.Screen name="Perfil" component={PerfilProfessor}/>
        <Stack.Screen name="Editar foto" component={EditarFoto}/>
        <Stack.Screen name="Avaliações" component={Avaliacoes}/>
        <Stack.Screen name='Modal sem conexão' component={ModalSemConexao} options={{headerShown: false}}/>
        <Stack.Screen name="Seleção Aluno Montar Treino" component={SelecaoAlunoAvaliacao}/>
        <Stack.Screen name="Seleção Aluno Análise do Programa de Treino" component={SelecaoAlunoAnaliseProgramaDeTreino}/>
        <Stack.Screen name="Avaliações Análise do Programa de Treino" component={Avaliacoes}/>
        <Stack.Screen name="Analise do Programa de Treino" component={TelaAnaliseDoProgramaDeTreino}/>
        <Stack.Screen name="Evolução" component={TelasDeEvolucao} />
        <Stack.Screen name="Seleção da evolução" component={SelecaoDaEvolucao}/>
        <Stack.Screen name="Evolução dados antropométricos" component={EvolucaoCorporal}/>
        <Stack.Screen name="Seleção do exercício" component={EvolucaoDoExercicioSelecao}/>
        <Stack.Screen name="Evolução do exercício" component={EvolucaoDoExercicio}/>
        <Stack.Screen name="Evolução dos testes" component={EvolucaoDosTestes}/>
        <Stack.Screen name="Evolução PSE" component={EvolucaoPse}/>
        <Stack.Screen name='Evolução QTR' component={EvolucaoQTR}/>
        <Stack.Screen name='Evolução CIT' component={EvolucaoCIT}/>
        <Stack.Screen name="Evolução Monotonia" component={EvolucaoMonotonia}/>
        <Stack.Screen name="Evolução Strain" component={EvolucaoStrain}/>
        <Stack.Screen name="Evolução PSE do Exercício Seleção" component={EvolucaoPSEDoExercicioSelecao}/>
        <Stack.Screen name="Evolução PSE do Exercício" component={EvolucaoPseBorg}/>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name='Mensagens' component={Mensagens} options={{headerShown: false}}/>
        <Stack.Screen name='Nova avaliação' component={NovaAvaliacao}/>
        <Stack.Screen name='Dados corporais' component={DadosCorporais}/>
        <Stack.Screen name="Testes parte 1" component={TestesParte1}/>
        <Stack.Screen name="Testes parte 2" component={TestesPart2}/>
        <Stack.Screen name='Testes parte 3' component={TestesParte3}/>
        <Stack.Screen name="Finalizar Testes" component={FinalizarTestes}/>
        <Stack.Screen name='Modal aviso avaliação sucesso' component={AvisoAvaliacaoFinalizada} options={{headerShown: false}}/>
        <Stack.Screen name="Frequencia do aluno" component={FrequenciaAluno}/>
        <Stack.Screen name="Seleção do Exercício" component={SelecaoDoExercicio}/>
        <Stack.Screen name="Adicionais exercício" component={AdicionaisExercicio}/>
        <Stack.Screen name="Nova Ficha" component={NovaFicha}/>
        <Stack.Screen name="Exportar CSV" component={ExportCSV}/>
        <Stack.Screen name="Seleção Aluno CSV" component={SelecaoAlunoExport}/>
        <Stack.Screen name="Trocar turma" component={TransferirAluno}/>
      </Stack.Navigator>
    </NavigationContainer> 
    );
}
