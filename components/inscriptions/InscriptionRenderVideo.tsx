import { API_URL } from "../../lib/constants";
import { cn } from "../../lib/utils";
import { InscriptionResponse } from "../../lib/types";

const InscriptionRenderVideo = ({
  inscription,
  className,
}: {
  inscription: InscriptionResponse;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-center bg-[#F2F0ED]", className)}>
      <video
        controls
        src={`${API_URL}/inscriptions/${inscription.id}/content`}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
        title={`Inscription #${inscription.number}`}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default InscriptionRenderVideo;

