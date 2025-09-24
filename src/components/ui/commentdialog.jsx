import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./button";

function CommentDialog({ open, setOpen }) {
  const [text, setText] = useState("");
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };
  const sendMessageHandler = async () => {
    alert(text);
  };
  return (
    <Dialog open={open}>
      <DialogTitle></DialogTitle>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="w-7xl p-0 flex flex-col"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1758640920659-0bb864175983?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="post_img"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link href={""}>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link href={""} className="font-semibold text-xs">
                    username
                  </Link>
                  {/* <span className="text-gray-600 text-sm">Bio here...</span> */}
                </div>
              </div>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogTitle></DialogTitle>
                  <DialogContent className="flex flex-col items-center text-sm text-center w-lg">
                    <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                      Unfollow
                    </div>
                    <div className="cursor-pointer w-full">
                      Add to favourites
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-96 p-4">
              comments will come
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  onChange={changeEventHandler}
                  value={text}
                  placeholder="Add a comment..."
                  className="w-full outline border-gray-300 p-2 rounded "
                />
                <Button
                  disabled={!text.trim()}
                  onClick={sendMessageHandler}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CommentDialog;
