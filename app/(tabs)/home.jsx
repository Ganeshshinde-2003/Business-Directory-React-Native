import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/HomeScreen/Header'
import Slider from '@/components/HomeScreen/Slidre'
import Category from '@/components/HomeScreen/Category'
import BusinessList from '../../components/HomeScreen/BusinessList'

export default function Home() {
  return (
    <ScrollView>
      <Header />
      <Slider />
      <Category />
      <BusinessList />
      <View style={{height: 50}}></View>
    </ScrollView>
  )
}