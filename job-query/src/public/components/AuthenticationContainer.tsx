type AuthenticationContainerProps = {
  children: React.ReactNode;
};

function AuthenticationContainer({ children }: AuthenticationContainerProps) {
  return (
    <div className="authentication">
      <div className="flex h-full items-center justify-center md:justify-end xl:mr-80 xl:w-auto">
        {children}
      </div>
    </div>
  );
}

export default AuthenticationContainer;
