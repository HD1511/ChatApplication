import toast from "react-hot-toast";

export const ToastSuccess = (Message) => {
    return toast.success(Message, {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
    });
}

export const ToastFailed = (Message) => {
  return toast.error(Message, {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
  });
}