import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ICoupons } from '../../../../contexts/types-custumer';

const CuponsCard: React.FC<{ tickets: ICoupons }> = ({ tickets }) => {
  function componentTicket(key: string, index: number) {
    const isChecked = index < tickets.tickets;
    return (
      <View key={key} style={styles.containerImage}>
        <Image
          style={styles.image}
          source={
            isChecked
              ? require('../../../../assets/images/tickets/tk1.png')
              : require('../../../../assets/images/tickets/tk2.png')
          }
        />
      </View>
    );
  }
  function renderTickets() {
    const arrTickets = [];
    for (let i = 0; i < 10; i++) {
      arrTickets.push(componentTicket(`ticket-${i}`, i));
    }
    return arrTickets;
  }

  return <View style={styles.container}>{renderTickets()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerImage: {
    height: '50%',
    width: '20%',
    borderRadius: 50,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 35,
  },
});

export default CuponsCard;
