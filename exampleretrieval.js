import api from './api';

const MyComponent = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    api.get('images/Amanita_muscaria').then(response => setImage(response.data));
  }, []);

  return (
    <div>
      {image && <img src={image} alt="Amanita muscaria" />}
    </div>
  );
};
