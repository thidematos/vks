import { UploadProvider } from "../features/new-match/context/UploadProvider";
import Upload from "../features/new-match/Upload";
import UploadList from "../features/new-match/UploadList";

function NewMatch() {
  return (
    <UploadProvider>
      <main className="flex w-full grow flex-row justify-center">
        <Upload />
        <UploadList />
      </main>
    </UploadProvider>
  );
}

export default NewMatch;
