import { Confirm } from "../../../components/ui/Confirm/Confirm"

export default function Page({ params } : { params: { confirmationId: string } }) {

  // TODO: Add db logic to get reservation details

  console.log(params.confirmationId);
  let confirmationId = params.confirmationId;
  let date = new Date();

  return (
    <div>
      <Confirm date={date} reservationId={confirmationId} />
    </div>
  );
}