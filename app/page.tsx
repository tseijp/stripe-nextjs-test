import Connect from "./_ui/Connect";
import Modal from "./_ui/Modal";
import Payment from "./_ui/Payment";

export default async function Home() {
  return (
    <>
      <Modal>
        <Connect />
        {/* <Payment /> */}
      </Modal>
    </>
  );
}
