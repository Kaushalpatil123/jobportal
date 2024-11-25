import React, { useEffect, useRef } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

function TermsAndConditionsPopup({ onClose, onAgree }) {
  const popupRef = useRef(null);

  const handleCancel = () => {
    onClose();
    onAgree(false); // Uncheck the checkbox
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
        onAgree(false); // Uncheck the checkbox
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, onAgree]);

  return (
    <div className="fixed mt-32 z-10 inset-0 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div
        ref={popupRef}
        className="bg-white w-[50%] rounded-lg p-6 overflow-y-auto max-h-[70vh] "
      >
        <h2 className="text-xl py-2 pl-7 text-white font-bold mb-4  bg-[#324c81] rounded-lg">
          Terms and Conditions
        </h2>
        <div className=" w-full my-10 text-left text-[14px] space-y-4 leading-6">
          <p>
            We do not warrant or guarantee any interview call or job offer with
            any of our services or from any prospective employer/organization
            that download the resume/insertion or information/data and uses it
            to contact the user. The user is cautioned to be wary of calls or
            emails from other websites claiming to offer comparable services
            under the name of doledgeIndia.com that ask for payment.
          </p>
          <p className="font-bold">
            PLEASE CAREFULLY READ THESE TERMS AND CONDITIONS OF USE. YOU AGREE
            TO BE BOUND BY THE TERMS AND CONDITIONS OF USE BELOW AND/OR ANY SUCH
            TERMS AND CONDITIONS OF USE AS ARE COMMUNICATED ON THE PAGES THEREOF
            BY ACCESSING THIS WEBSITE AND ANY PAGES THEREOF. DO NOT ACCESS THIS
            WEBSITE OR ANY OF ITS PAGES IF YOU DO NOT AGREE TO THE TERMS AND
            CONDITIONS OF USE BELOW AND/OR ANY SUCH TERMS AND CONDITIONS OF USE
            AS ARE COMMUNICATED ON THE PAGES THEREOF.
          </p>
          <p>
            The Information Technology Act of 2000 and the provisions of Rule
            3(1) of the Information Technology (Intermediaries guidelines) Rules
            of 2011, regulations, guidelines, bye laws, and notifications made
            subsequently that require publishing the rules and regulations,
            privacy policy, and Terms &amp; Conditions of Use for access or
            usage of this website, have guided the publication of these Terms
            &amp; Conditions of Use.
          </p>
          <p>
            The domain name{" "}
            <a
              href="https://doledgeindia.com/"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              www.doledgeindia.com
            </a>{" "}
            (Website) is owned and operated by DOLEDGE INDIA (OPC) PRIVATE
            LIMITED. By accessing this Website or any of its pages, you are
            agreeing to these Terms &amp; Conditions of Use.
          </p>
          <p>
            When using any of the services offered through the Website,
            including but not limited to job listings, resume services, etc.,
            you must comply with the rules, guidelines, policies and conditions
            applicable to that service. Shall be incorporated into and
            considered a part of these Terms of Use. We reserve the right, at
            our sole discretion, to change, modify, add or remove portions of
            these Terms of Use at any time without prior written notice. It is
            your responsibility to check these Terms of Use periodically for
            updates/changes. Your continued use of the Website following the
            posting of any changes constitutes your acceptance and agreement to
            the changes. So long as you comply with these Terms of Use, we grant
            you a personal, non-exclusive, non-transferable, limited right to
            access and use the Website.
          </p>
          <p>
            We do our best to ensure uninterrupted availability and error-free
            transmission of our website. However, due to the nature of the
            Internet, this cannot be guaranteed. We may also suspend or restrict
            user access to the Website at any time without notice to perform
            repairs, maintenance or service. We will endeavor to limit the
            frequency and duration of such suspensions or restrictions.
          </p>
          <p>
            By impliedly or expressly accepting these Terms &amp; Conditions of
            Use, You also accept and agree to be bound by our Policies
            (including but not limited to{" "}
            <a
              href="https://doledgeindia.com/privacy-policy-2/"
              style={{ color: "blue", textDecoration: "underline" }}
            >
              Privacy Policy
            </a>
            ) as amended from time to time.
          </p>
          <p>
            All terms refer to the offer, acceptance and consideration of
            payment necessary to undertake the process of our assistance to the
            Client in the most appropriate manner, whether by formal meetings of
            a fixed duration, or any other means.
          </p>
          <p>
            For the express purpose of meeting the Client&apos;s needs in
            respect of provision of the Company&apos;s stated services/products,
            in accordance with and subject to, prevailing law of India. Any use
            of the above terminology or other words in the singular, plural,
            capitalization and/or he/she or they, are taken as interchangeable
            and therefore as referring to same.
          </p>
          <p>
            We employ the use of cookies. By using Doledge India website you
            consent to the use of cookies in accordance with Doledge India
            privacy policy.
          </p>
          <p>
            Most of the modern day interactive web sites use cookies to enable
            us to retrieve user details for each visit. Cookies are used in some
            areas of our site to enable the functionality of this area and ease
            of use for those people visiting. Some of our affiliate /
            advertising partners may also use cookies.
          </p>
          <p className=" font-bold pt-3">User Comments</p>
          <ul className="list-disc  pl-6">
            <li>This Agreement shall begin on the date hereof.</li>
            <li>
              Certain parts of this website offer the opportunity for users to
              post and exchange opinions, information, material and data
              (&apos;Comments&apos;) in areas of the website. Doledge India does
              not screen, edit, publish or review comments prior to their
              appearance on the website and comments do not reflect the views or
              opinions of Doledge India, its agents or affiliates. Comments
              reflect the view and opinion of the person who posts such view or
              opinion. To the extent permitted by applicable laws Doledge India
              shall not be responsible or liable for the comments or for any
              loss cost, liability, damages or expenses caused and or suffered
              as a result of any use of and/or posting of and/or appearance of
              the comments on this website.
            </li>
            <li>
              Doledge India reserves the right to monitor all comments and to
              remove any comments which it considers in its absolute discretion
              to be inappropriate, offensive or otherwise in breach of these{" "}
              <a
                href="https://doledgeindia.com/terms-conditions/"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Terms and Conditions
              </a>{" "}
              &amp;{" "}
              <a
                href="https://doledgeindia.com/contact-us/"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Contact Information
              </a>
              .
            </li>
          </ul>
          <p>Hyperlinking to our Content</p>
          <p className="font-bold pt-2">
            The following organizations may link to our Web site without prior
            written approval:
          </p>
          <p className="font-bold pt-2">LINKS AND PAGES</p>
          <p>
            This site may contain links and pages to sites maintained or
            provided by third parties. We are not responsible for any
            information, materials, products or services posted or offered on
            third party sites linked to this Site. We do not endorse or
            recommend any products, services, or information offered or
            recommended on this website, and we are not responsible for any
            failure of any product or service offered or advertised on this
            website.
          </p>
          <ul className="list-disc  pl-6">
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>
              Online directory distributors when they list us in the directory
              may link to our Web site in the same manner as they hyperlink to
              the Web sites of other listed businesses; and
            </li>
            <li>
              System wide Accredited Businesses except soliciting non-profit
              organizations, charity shopping malls, and charity fundraising
              groups which may not hyperlink to our Web site.
            </li>
            <li>
              These organizations may link to our home page, to publications or
              to other Web site information so long as the link: (a) is not in
              any way misleading; (b) does not falsely imply sponsorship,
              endorsement or approval of the linking party and its products or
              services; and (c) fits within the context of the linking
              party&apos;s site.
            </li>
            <li>
              We may consider and approve in our sole discretion other link
              requests from the following types of organizations.
            </li>
            <li>
              Commonly-known consumer and/or business information sources such
              as Chambers of Commerce, American Automobile Association, AARP and
              Consumers Union;
            </li>
            <li>com community sites;</li>
            <li>
              Associations or other groups representing charities, including
              charity giving sites,
              <br />
              Online directory distributors;
            </li>
            <li>Internet portals;</li>
            <li>
              Accounting, law and consulting firms whose primary clients are
              businesses; and
            </li>
            <li>Educational institutions and trade associations.</li>
          </ul>
          <p>
            We will approve link requests from these organizations if we
            determine that: (a) the link would not reflect unfavorably on us or
            our accredited businesses (for example, trade associations or other
            organizations representing inherently suspect types of business,
            such as work-at-home opportunities, shall not be allowed to link);
            (b)the organization does not have an unsatisfactory record with us;
            (c) the benefit to us from the visibility associated with the
            hyperlink outweighs the absence of Doledge India; and (d) where the
            link is in the context of general resource information or is
            otherwise consistent with editorial content in a newsletter or
            similar product furthering the mission of the organization.
          </p>
          <p>
            These organizations may link to our home page, to publications or to
            other Web site information so long as the link: (a) is not in any
            way misleading; (b) does not falsely imply sponsorship, endorsement
            or approval of the linking party and its products or services; and
            (c) fits within the context of the linking party&apos;s site.
          </p>
          <p>
            If you are among the organizations listed in paragraph 2 above and
            are interested in linking to our website, you must notify us by
            sending an e-mail to info@doledgeindia.com. Please include your
            name, your organization name, contact information (such as a phone
            number and/or e-mail address) as well as the URL of your site, a
            list of any URLs from which you intend to link to our Web site, and
            a list of the URL(s) on our site to which you would like to link.
            Allow 2-3 weeks for a response.
          </p>
          <p className="font-bold">
            Approved organizations may hyperlink to our Web site as follows:
          </p>
          <p>
            By use of our corporate name; or
            <br />
            By use of the uniform resource locator (Web address) being linked
            to; or
            <br />
            By use of any other description of our Web site or material being
            linked to that makes sense within the context and format of content
            on the linking party&apos;s site.
            <br />
            No use of Doledge India&apos;s logo or other artwork will be allowed
            for linking absent a trademark license agreement.
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 text-xs rounded-lg hover:bg-red-600"
          >
            CANCEL
          </button>
          <button
            onClick={() => onAgree(true)}
            className="bg-blue-500 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            AGREE
          </button>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditionsPopup;
