const Image = ({ src }) => {
  return (
    <div className="w-12 h-12 rounded-full  overflow-hidden mx-2">
      <img src={src} className="object-cover " />
    </div>
  );
};

export default Image;
