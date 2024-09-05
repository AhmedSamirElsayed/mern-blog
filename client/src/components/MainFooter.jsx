/* eslint-disable react/no-unescaped-entities */
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

const MainFooter = () => {
  return (
    <>
      <Footer
        container
        className="border border-t-8 border-teal-500 fixed bottom-0"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5  border-b-2 border-amber-500 p-3 sm:border-none ">
              <Link
                to="/"
                className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
              >
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                  Ahmed's
                </span>
                Blog
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <Footer.Title title="About" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://www.100jsprojects.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    100 JS Projects
                  </Footer.Link>
                  <Footer.Link
                    href="/about"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ahmed's Blog
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title="Follow Us" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://github.com/AhmedSamirElsayed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MY Githup
                  </Footer.Link>
                  <Footer.Link
                    href="https://linkedin.com/in/ahmedsamirelsayed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MY Linked in
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title title=" LEGAL" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://github.com/AhmedSamirElsayed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </Footer.Link>
                  <Footer.Link
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Tearms &amp; Conditions
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              href="#"
              by="Ahmed Samir"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-5 sm:mt-0 mt-4 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsLinkedin} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitterX} />
              <Footer.Icon href="#" icon={BsGithub} />
              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default MainFooter;
