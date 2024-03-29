import LoadingSpinner from '../../loading/spinner';
const PrimaryButton = ({
  buttonText,
  isLoading = false,
  onClick,
  ...buttonProps
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white 
      shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 
      focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      {...buttonProps}
      disabled={isLoading}
    >
      {isLoading ? <LoadingSpinner /> : buttonText}
    </button>
  );
};

export default PrimaryButton;
