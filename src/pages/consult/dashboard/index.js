function index() {
  return null;
}

export default index;

export function getServerSideProps() {
  return {
    redirect: {
      destination: "/consult/dashboard/overview",
      permanent: false,
    },
  };
}
