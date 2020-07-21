import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  FlatList,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { colors } from '../../../utils/styles';
import { IEmployeeFavorite } from '../../../contexts/types-custumer';
interface item {
  id: string;
  image_url: string;
  empty: boolean;
}

const BarbersPictures: React.FC<{ barbers: IEmployeeFavorite[] }> = ({
  barbers,
}) => {
  const [barberFiltered, setBarberFiltered] = useState<IEmployeeFavorite[]>([]);
  const [columns, setColumns] = useState(0);

  useEffect(() => {
    const arr = barbers.map(barber => {
      return { ...barber, empty: false };
    });
    //console.log(arr);

    const col = 3;
    if (barbers.length !== 0) {
      const filtered = createRows(arr, col);
      setBarberFiltered(filtered);
      setColumns(col);
    }
  }, [barbers, columns]);

  function createRows(data: IEmployeeFavorite[], col: number) {
    const rows = Math.floor(data.length / col);
    //console.log('rowws ', rows);

    let lastRowElements = data.length - rows * col;
    //console.log('last ', lastRowElements);

    while (lastRowElements !== col) {
      data.push({
        id: `empty-${lastRowElements}`,
        avatar: {
          url: `empty-${lastRowElements}`,
        },
        empty: true,
      });
      lastRowElements += 1;
    }

    return data;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Barber's</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Anton-Regular',
    fontSize: 18,
    color: colors.secondaryColor,
  },
  containerBarbers: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    //backgroundColor: 'blue',
  },
  flatlist: {
    flex: 1,
    //alignItems: 'center',
  },
  containerImageEmpty: {
    borderWidth: 0,
  },
  containerImage: {
    alignItems: 'center',
  },
  textNameBarbers: {
    fontFamily: 'Comfortaa-Regular',
    fontSize: 12,
    color: colors.secondaryColor,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
});
export default BarbersPictures;
/**
 *   function componentBarber(item: IEmployeeFavorite) {
    return (
      <TouchableOpacity key={String(item.id)} style={styles.containerImage}>
        <Image style={styles.image} source={{ uri: item.avatar.url }} />
      </TouchableOpacity>
    );
  }

  function renderBarbers() {
    const arr = [];
    for (let i = 0; i < barbers.length; i++) {
      arr.push(componentBarber(barbers[i]));
    }
    return arr;
  }
          <FlatList
          style={styles.flatlist}
          data={barbers}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.containerImage}>
              <Text style={styles.textNameBarbers}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
 */
