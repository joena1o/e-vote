import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notify = (message)=> toast.success(message);
export const errorNotice = (message)=> toast.error(message);