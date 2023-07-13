import { API_URL } from "../../lib/constants";
import { cn } from "../../lib/utils";
import { InscriptionResponse } from "../../lib/types";

const InscriptionRenderAudio = ({
  inscription,
  className,
}: {
  inscription: InscriptionResponse;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-center bg-[#F2F0ED]", className)}>
      <audio
        controls
        src={`${API_URL}/inscriptions/${inscription.id}/content`}
        title={`Inscription #${inscription.number}`}
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default InscriptionRenderAudio;

