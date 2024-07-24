import { FlatList, ScrollView, View } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'

export default function ExploreBusinessList({businesslist}) {
  return (
    <ScrollView>
      <FlatList
        data={businesslist}
        renderItem={({item, index}) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
      <View style={{height: 400}}></View>
    </ScrollView>
  )
}