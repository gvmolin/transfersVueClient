import axios from 'axios'
import { ElNotification } from 'element-plus';

const notifDuration = 2000;

export const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + ":" + import.meta.env.VITE_PORT + "/",
    timeout: notifDuration,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const get = async (url:string, params = {}) => {
    try {
      const response = await axiosInstance.get(url, { ...params, headers: { Accept :"*/*" }});
      ElNotification({
        message: "Sucesso ao buscar dados", 
        duration: notifDuration, 
        type:'success'
      });
      return response.data;
    } catch (error:any) {
      console.error('Error fetching data:', error);
      ElNotification({
        message: error.message || "Erro ao buscar dados", 
        duration: notifDuration, 
        type:'error'
      });
      throw error;
    }
  }

  const post = async (url:string, data = {}) => {
    try {
      const response = await axiosInstance.post(url, data);
      ElNotification({
        message: "Sucesso ao enviar dados", 
        duration: notifDuration, 
        type:'success'
      });
      return response.data;
    } catch (error:any) {
      console.error('Error posting data:', error);
      ElNotification({
        message: error.message || "Erro ao enviar dados", 
        duration: notifDuration, 
        type:'error'
      });
      throw error;
    }
  }

  const put = async (url:string, data = {}) => {
    try {
      const response = await axiosInstance.put(url, data);
      ElNotification({
        message: "Sucesso ao atualizar dados", 
        duration: notifDuration, 
        type:'success'
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating data:', error);
      console.error('Error posting data:', error);
      ElNotification({
        message: error.message || "Erro ao atualizar dados", 
        duration: notifDuration, 
        type:'error'
      });
      throw error;
    }
  }

  const remove = async (url:string, params = {}) => {
    try {
      const response = await axiosInstance.delete(url, { params });
      ElNotification({
        message: "Sucesso ao deletar dados", 
        duration: notifDuration, 
        type:'success'
      });
      return response.data;
    } catch (error:any) {
      console.error('Error deleting data:', error)
      ElNotification({
        message: "Erro ao deletar dados", 
        duration: error.message || notifDuration, 
        type:'error'
      });
      throw error;
    }
  }



  return { get, post, put, remove };
}
