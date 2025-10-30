import React, { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { notificationsState } from "state";
import { ListRenderer } from "components/list-renderer";
import { Box, Text, Button, Icon, Page, Header } from "zmp-ui";
import { Divider } from "components/divider";

const NotificationList: FC = () => {
  const notifications = useRecoilValue(notificationsState);
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (item) => {
    // Mở modal hiển thị nội dung chi tiết
    setSelected(item.id);
  };

  const closeModal = () => setSelected(null);

  const selectedNotification = notifications.find((n) => n.id === selected);

  return (
    <Box className="bg-background">
      <ListRenderer
        title="Thông báo mới"
        limit={3} // đổi số nếu muốn hiển thị ít/ nhiều ở collapsed
        items={notifications}
        onClick={handleClick}
        renderKey={(item) => String(item.id)}
        renderLeft={(item) => (
          <img className="w-10 h-10 rounded-full" src={item.image} alt={item.title} />
        )}
        renderRight={(item) => (
          <Box>
            <Text.Header>{item.title}</Text.Header>
            <Text
              size="small"
              className="text-gray overflow-hidden whitespace-nowrap text-ellipsis"
            >
              {item.content}
            </Text>
          </Box>
        )}
        noDivider={false}
      />

      {/* Simple modal / drawer để show chi tiết */}
      {selectedNotification && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end justify-center"
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
          />
          {/* content */}
          <div className="relative z-10 w-full max-w-lg rounded-t-xl bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <Text.Header>{selectedNotification.title}</Text.Header>
              <Button onClick={closeModal} type="neutral" variant="tertiary">
                <Icon icon="zi-close" />
              </Button>
            </div>
            <div className="flex items-start space-x-3">
              <img
                src={selectedNotification.image}
                alt={selectedNotification.title}
                className="w-14 h-14 rounded"
              />
              <div>
                <Text size="small" className="whitespace-pre-wrap">
                  {selectedNotification.content}
                </Text>
              </div>
            </div>

            {/* nếu cần hành động (mark read, link đến đơn, v.v.) */}
            <div className="mt-4">
              <Button fullWidth onClick={closeModal}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};


const NotificationPage: FC = () => {
  return (
    <Page>
      <Header title="Thông báo" showBackIcon={false} />
      <Divider />
      <Box className="p-4">
        <NotificationList />
      </Box>
    </Page>
  );
};

export default NotificationPage;
