

export default function UserProfile({ params }) {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">
          Profile Page
          <span className="text-blue-500 p-3">{params.id}</span>
        </h1>
      </div>
    </>
  );
}
