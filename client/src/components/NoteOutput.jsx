import { Card, CardContent, Typography } from "@mui/material";

const NoteOutput = ({ rewritten }) => {
  if (!rewritten) return null;
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          AI Refinement
        </Typography>
        <Typography style={{ whiteSpace: "pre-line" }}>{rewritten}</Typography>
      </CardContent>
    </Card>
  );
};

export default NoteOutput;
