import React, { FC } from "react";
import { Box, Icon, Text } from "zmp-ui";

export const OrderInfo: FC = () => {
  return (
    <Box className="bg-white">
      <Box className="p-4">
        <Text.Title className="mb-4">Hình thức nhận hàng</Text.Title>

        {/* Chọn cửa hàng */}
        <Box
          className="flex items-center justify-between py-3 border-b border-gray-100"
          onClick={() => {
            /* Navigate to store selection */
          }}
        >
          <Box className="flex items-center space-x-3">
            <Icon icon="zi-location" className="text-primary" />
            <Box>
              <Text className="font-medium text-primary">Chọn cửa hàng</Text>
              <Text size="xSmall" className="text-gray">
                Yêu cầu truy cập vị trí
              </Text>
            </Box>
          </Box>
          <Icon icon="zi-chevron-right" />
        </Box>

        {/* Chọn thời gian */}
        <Box
          className="flex items-center justify-between py-3 border-b border-gray-100"
          onClick={() => {
            /* Navigate to time selection */
          }}
        >
          <Box className="flex items-center space-x-3">
            <Icon icon="zi-clock-1" className="text-gray" />
            <Box>
              <Text className="font-medium">13h00 - 13h30, 24/11/2025</Text>
              <Text size="xSmall" className="text-gray">
                Thời gian nhận hàng
              </Text>
            </Box>
          </Box>
          <Icon icon="zi-chevron-right" />
        </Box>

        {/* Thông tin người nhận */}
        <Box
          className="flex items-center justify-between py-3"
          onClick={() => {
            /* Navigate to recipient info */
          }}
        >
          <Box className="flex items-center space-x-3">
            <Icon icon="zi-user" className="text-gray" />
            <Box>
              <Text className="font-medium">User Name - 0337076898</Text>
              <Text size="xSmall" className="text-gray">
                Người nhận
              </Text>
            </Box>
          </Box>
          <Icon icon="zi-chevron-right" />
        </Box>

        {/* Nhiều đá */}
        <Box className="flex items-center space-x-3 py-3">
          <Icon icon="zi-note" className="text-gray" />
          <Text className="text-gray">Nhiều đá</Text>
        </Box>

        <Text size="xSmall" className="text-gray mt-2">
          Bằng việc tiến hành thanh toán, bạn đồng ý với điều kiện sử dụng và
          điều khoản sử dụng của Zalo Mini App
        </Text>
      </Box>
    </Box>
  );
};
