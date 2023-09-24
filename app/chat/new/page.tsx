import NewRoomForm from './components/NewRoomForm';

const NewRoomPage = () => {
  return (
    <div className="w-3/4 flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="text-4xl font-medium pb-6">Create new chat</h1>
        <p>
          Fill in the fields below to create your own AI chat room. <br />
          <em>Chat rooms will be publicly viewable.</em>
        </p>
        <NewRoomForm />
      </section>
    </div>
  );
};

export default NewRoomPage;
