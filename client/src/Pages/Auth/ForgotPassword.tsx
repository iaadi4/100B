import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      toast.success('Reset link sent successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to send reset link.');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
        </div>
        <div className="relative w-full">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="pl-10"
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        {
          loading ? (
            <Button disabled className=""><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</Button>
          ) : (
            <Button className="bg-black">Send Reset Link</Button>
          )
        }
        <span className="text-center">
          Back to{" "}
          <Link to="/login" className="text-blue-800">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default ForgotPassword;


