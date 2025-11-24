import React, { FC } from "react";
import { Box, Button, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { useToBeImplemented } from "hooks";

export const CheckoutFooter: FC = () => {
  const navigate = useNavigate();
  const onClick = useToBeImplemented();

  return (
    <Box className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 safe-bottom">
      <Box className="flex items-center justify-between mb-3">
        <Text size="small" className="text-gray">
          1 sản phẩm
        </Text>
        <Box className="text-right">
          <Text.Title size="large" className="text-primary font-bold">
            16,000đ
          </Text.Title>
        </Box>
      </Box>
      <Button fullWidth className="rounded-full" onClick={onClick}>
        Đặt hàng
      </Button>
    </Box>
  );
};
