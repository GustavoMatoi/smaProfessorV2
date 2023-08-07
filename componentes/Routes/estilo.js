import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './../Home'
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import SelecaoAluno from '../SelecaoAluno';
import Logo from '../Logo';
import Parq from '../Parq';
import PerfilProfessor from '../PerfilProfessor';
import Notificacoes from '../Notificacoes';

const Tab = createBottomTabNavigator()

export default function Routes(){
    return (
        <Tab.Navigator   screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#182128',
                borderTopColor: '#182128'
                
            },
            tabBarActiveTintColor: '#0066FF',
            tabBarInactiveTintColor: '#CFCDCD',            
          }}>
            <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
                tabBarIcon: ({size, color}) => (<Ionicons name="home-outline" size={size} color={color} />)
            }}/>
            <Tab.Screen 
            name="Alunos" 
            component={SelecaoAluno}
            options={{
                tabBarIcon: ({size, color}) => (<Ionicons name="people" size={size} color={color} />)
            }}/>
            <Tab.Screen 
            name="Perfil" 
            component={PerfilProfessor}
            options={{
                tabBarIcon: ({size, color}) => (<AntDesign name="user" size={size} color={color} />)
            }}/>
            <Tab.Screen 
            name="Notificações" 
            component={Notificacoes}
            options={{
                tabBarIcon: ({size, color}) => (<Ionicons name="notifications-outline" size={size} color={color} />)

            }}/>

        </Tab.Navigator>
    )
}