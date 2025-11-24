import React, { FC } from "react";
import { Divider } from "components/divider";
import { Header, Page } from "zmp-ui";
import { CartItems } from "./cart-items";
import { OrderInfo } from "./order-info";
import { CheckoutFooter } from "./checkout-footer";
import { useVirtualKeyboardVisible } from "hooks";

const CartPage: FC = () => {
  const keyboardVisible = useVirtualKeyboardVisible();

  return (
    <Page className="flex flex-col bg-background">
      <Header title="Giỏ hàng" showBackIcon={false} />
      <CartItems />
      <Divider size={12} />
      <OrderInfo />
      <Divider size={80} className="flex-1" />
      {!keyboardVisible && <CheckoutFooter />}
    </Page>
  );
};

export default CartPage;
