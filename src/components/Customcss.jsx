import React from 'react'

const Customcss = () => {
  return (
    <div>
        <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            // font-family: 'Poppins';
        }
        .new-body {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #444;
        }
        .new-container {
            position: relative;
            width: 100vw;
            height: 87vh;
            background: #fff;
            // border-radius: 15px;
            // box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }
        .new-container::before {
            content: "";
            position: absolute;
            top: 0;
            left: -50%;
            width: 100%;
            height: 100%;
            background: linear-gradient(-45deg, #F58634, #520852);
            z-index: 6;
            transform: translateX(100%);
            transition: 1s ease-in-out;
        }
        .new-signin-signup {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            z-index: 5;
        }
        .new-form {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 40%;
            min-width: 238px;
            padding: 0 10px;
        }
        .new-form.new-sign-in-form {
            opacity: 1;
            transition: 0.5s ease-in-out;
            transition-delay: 1s;
        }
        .new-form.new-sign-up-form {
            opacity: 0;
            transition: 0.5s ease-in-out;
            transition-delay: 1s;
        }
        .new-title {
            font-size: 35px;
            color: #F58634;
            margin-bottom: 10px;
        }
        .new-input-field {
            width: 80%;
            height: 50px;
            background: #f0f0f0;
            margin: 10px 0;
            border: 2px solid #F58634;
            border-radius: 50px;
            display: flex;
            align-items: center;
        }
        .new-input-field i {
            flex: 1;
            text-align: center;
            color: #666;
            font-size: 18px;
        }
        .new-input-field input {
            flex: 5;
            background: none;
            border: none;
            outline: none;
            width: 100%;
            font-size: 18px;
            font-weight: 600;
            color: #444;
        }
        .new-btn {
            width: 150px;
            height: 50px;
            border: none;
            border-radius: 50px;
            background: #F58634;
            color: #fff;
            font-weight: 600;
            margin: 10px 0;
            text-transform: uppercase;
            cursor: pointer;
        }
        .new-btn:hover {
            // background: #c03cc0;
            border-radius: 20px;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
        }
        .new-social-text {
            margin: 10px 0;
            font-size: 16px;
        }
        .new-social-media {
            display: flex;
            justify-content: center;
        }
        .new-social-icon {
            height: 45px;
            width: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #444;
            border: 1px solid #444;
            border-radius: 50px;
            margin: 0 5px;
        }
        .new-a {
            text-decoration: none;
        }
        .new-social-icon:hover {
            color: #F58634;
            border-color: #F58634;
        }
        .new-panels-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
        }
        .new-panel {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            width: 35%;
            min-width: 238px;
            padding: 0 10px;
            text-align: center;
            z-index: 6;
        }
        .new-left-panel {
            pointer-events: none;
        }
        .new-content {
            color: #fff;
            transition: 1.1s ease-in-out;
            transition-delay: 0.5s;
        }
        .new-panel.new-h3 {
            font-size: 24px;
            font-weight: 600;
        }
        .new-panel.new-p {
            font-size: 15px;
            padding: 10px 0;
        }
        .new-image {
            width: 100%;
            transition: 1.1s ease-in-out;
            transition-delay: 0.4s;
        }
        .new-left-panel .new-image,
        .new-left-panel .new-content {
            transform: translateX(-200%);
        }
        .new-right-panel .new-image,
        .new-right-panel .new-content {
            transform: translateX(0);
        }
        .new-account-text {
            display: none;
        }
        /*Animation*/
        .new-container.new-sign-up-mode::before {
            transform: translateX(0);
        }
        .new-container.new-sign-up-mode .new-right-panel .new-image,
        .new-container.new-sign-up-mode .new-right-panel .new-content {
            transform: translateX(200%);
        }
        .new-container.new-sign-up-mode .new-left-panel .new-image,
        .new-container.new-sign-up-mode .new-left-panel .new-content {
            transform: translateX(0);
        }
        .new-container.new-sign-up-mode.new-form.new-sign-in-form {
            opacity: 0;
        }
        .new-container.new-sign-up-mode.new-form.new-sign-up-form {
            opacity: 1;
        }
        .new-container.new-sign-up-mode .new-right-panel {
            pointer-events: none;
        }
        .new-container.new-sign-up-mode .new-left-panel {
            pointer-events: all;
        }
        /*Responsive*/
        @media (max-width:779px) {
            .new-container {
                width: 100vw;
                height: 100vh;
            }
        }
        @media (max-width:635px) {
            .new-container::before {
                display: none;
            }
            .new-form {
                width: 80%;
            }
            .new-form.new-sign-up-form {
                display: none;
            }
            .new-container.new-sign-up-mode2.new-form.new-sign-up-form {
                display: flex;
                opacity: 1;
            }
            .new-container.new-sign-up-mode2.new-form.new-sign-in-form {
                display: none;
            }
            .new-panels-container {
                display: none;
            }
            .new-account-text {
                display: initial;
                margin-top: 30px;
            }
        }
        @media (max-width:320px) {
            .new-form {
                width: 90%;
            }
        }


        // @media (max-width: 650px)  {
        //     .new-sign-in-form.visible {
        //       display: flex;
        //       justify-content:center;
        //       aligned-items: center;
              
              
        //     }
          
        //     .new-sign-in-form {
        //       display: none;
              
          
        //     }
          }

          #small-device-content {
            display: none;
          }
        `}
      </style> 
    </div>
  )
}

export default Customcss