const Card = ({ name, subtype, balance1, balance2 }) => {
  return (
    <div className='relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border'>
      <div className='p-6'>
        <h5 className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
          {name}
        </h5>
        <h3>Balances</h3>
        <h2>{balance1}</h2>
        <h2>{balance2}</h2>
      </div>
      <div className='p-6 pt-0'>Type: {subtype}</div>
    </div>
  );
};
export default Card;
