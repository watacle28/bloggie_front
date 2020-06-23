import React from 'react'
import Avatar from 'react-avatar-editor'

export const AvatarEd = () => {
    return (
        <div>
            <Avatar
                image='https://res.cloudinary.com/practicaldev/imagefetch/s--JZdw8X7R--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/257476/6fa9ac2a-16e0-4bcb-863e-3dfca2cd68da.jpg'
                width={250}
                height={250}
                border={2}
                color={[255,255,255,.6]}
            />
        </div>
    )
}
