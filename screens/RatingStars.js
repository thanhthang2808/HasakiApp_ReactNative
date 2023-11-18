import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating); // Số ngôi sao đầy đủ
  const hasHalfStar = rating % 1 !== 0; // Kiểm tra xem có phải nửa ngôi sao không

  // Tạo mảng biểu tượng ngôi sao đầy đủ
  const fullStarsArray = Array.from({ length: fullStars }, (_, index) => (
    <Icon
      name="star"
      key={index}
      size={15}
      color="gold"
    />
  ));

  // Nếu có nửa ngôi sao, thêm biểu tượng ngôi sao nửa
  const halfStar = hasHalfStar && (
    <Icon
      name="star-half"
      key="half-star"
      size={15}
      color="gold"
    />
  );

  // Tính toán số ngôi sao rỗng cần thêm
  const emptyStars = Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }, (_, index) => (
    <Icon
      name="star-outline"
      key={`empty-star-${index}`}
      size={15}
      color="#D3D3D3"
    />
  ));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
      <Text style={{ marginRight: 5, fontSize: 12, color: '#306E51' }}>{rating}</Text>
      {fullStarsArray}
      {halfStar}
      {emptyStars}
    </View>
  );
};

export default RatingStars;
