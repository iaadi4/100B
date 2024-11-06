import axios from "@/api/axios";

const Home = async () => {
  const response = await axios.get('/api/v1/refresh', { withCredentials: true });
  console.log(response);

  return (
    <div>Home</div>
  )
}

export default Home;